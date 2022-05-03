/**
 * 用于日期时间选择器
*/
export const englishMonths = new Map<string,string>([
    ['1','January'],
    ['2','February'],
    ['3','March'],
    ['4','April'],
    ['5','May'],
    ['6','June'],
    ['7','July'],
    ['8','August'],
    ['9','September'],
    ['10','October'],
    ['11','November'],
    ['12','December']
])

const commonYearMap = new Map<string,number>([
    ['1',31],
    ['2',28],
    ['3',31],
    ['4',30],
    ['5',31],
    ['6',30],
    ['7',31],
    ['8',31],
    ['9',30],
    ['10',31],
    ['11',30],
    ['12',31]
])

const leapYearMap = new Map<string,number>([
    ['1',31],
    ['2',29],
    ['3',31],
    ['4',30],
    ['5',31],
    ['6',30],
    ['7',31],
    ['8',31],
    ['9',30],
    ['10',31],
    ['11',30],
    ['12',31]
])

/**
 * 判断是否是闰年
 * @param year
 * @returns 
 */
function isLeapYear(year:number): boolean{
    //能被4整除却不能被100整除或能被400整除的年份就是闰年
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}

// ****************************
// 导出
// **************************

/**
 * 根据年月获取该月的天数
 * @param year 
 * @param month 从1开始月
 * @returns 
 */
export function getDateCountByYearAndMonth(year: number, month: number): number{
    // 该年是否是闰年
    if(isLeapYear(year))
        return leapYearMap.get(month.toString())!
    else
        return commonYearMap.get(month.toString())!
}

/**
 * 日期时间选择器的时间对象
 */
export class DateObject{
    date: Date
    isCurrentMonth: boolean /** 控制CSS显示不是本月份的日期 */
    isSelected: boolean     /** 控制CSS显示被选中的日期 */
    constructor(date: Date,isCurrentMonth: boolean,isSelected: boolean){
        this.date = date,
        this.isCurrentMonth = isCurrentMonth,
        this.isSelected = isSelected
    }
}

/**
 * 根据当前的date对象获取年月日时分秒
 * @param date 
 * @returns 年月（从1开始月）日时分秒
 */
export function getYearMonthDateHourMinuteSecond(date: Date): number[]{
    return [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()]
}

/**
 * 使用字符串模板创建一个 date 对象
 * @param year 
 * @param month 从1开始月
 * @param date 
 * @param hour 
 * @param minute 
 * @param second 
 */
export function createDate(year: number, month: number, date: number, hour?: number | undefined, minute?: number | undefined, second?: number | undefined): Date{
    if(hour!== undefined && minute!==undefined && second!==undefined)
        return new Date(`${year}-${month}-${date} ${hour}:${minute}:${second}`)
    else
        return new Date(`${year}-${month}-${date}`)
}


/**
 * 根据一个date对象获取 日期显示器一页的日期
 * @param date 
 * @returns 日数组
 */
export function getFullScreen(date: Date){
    let [nowYear, nowMonth, nowDate, nowHour, nowMinute, nowSecond] = getYearMonthDateHourMinuteSecond(date);

    // 一个展示屏的所有天数
    let screenDates: DateObject[];
    // 该月有多少天
    let dateCount = getDateCountByYearAndMonth(nowYear,nowMonth);

    //[...Array.from(new Array(10).keys())] 快速生成天数数组
    // 在ts中 ...解构运算符只能用于array与string： [...Array.from(new Array(dateCount).keys())]
    screenDates = [...new Array(dateCount).keys()].map((value)=>{
        if(value + 1 !== nowDate)
            return new DateObject(createDate(nowYear,nowMonth,value+1,nowHour,nowMinute,nowSecond),true,false)
        else
            return new DateObject(createDate(nowYear,nowMonth,value+1,nowHour,nowMinute,nowSecond),true,true)
    })
    // 计算该月首是星期几，这里使用year,month,day的参数注意时区问题：
    // 当Date作为构造函数调用并传入多个参数时，所定义参数代表的是当地时间。如果需要使用世界协调时 UTC，使用 new Date(Date.UTC(...)) 和相同参数。
    // 同时注意：星期天是0，需要变成7才符合逻辑
    let monthStartDay = new Date(Date.UTC(nowYear,nowMonth-1,1)).getDay() === 0? 7 :new Date(Date.UTC(nowYear,nowMonth-1,1)).getDay()


    // 计算出该月的前一月需要补几天
    let prevCount = monthStartDay - 1;
    let prevMonthDates: DateObject[] = []
    // 计算出上一个月的总天数
    let prevMonthDateCount = getDateCountByYearAndMonth(nowMonth===1?nowYear-1:nowYear,nowMonth===1?12:nowMonth-1)
    // 上一个月的date对象
    for(let i=prevCount - 1;i>=0;i--)
        prevMonthDates.push(
            new DateObject(createDate(nowMonth===1?nowYear-1:nowYear,nowMonth===1?12:nowMonth-1,prevMonthDateCount - i), false, false )// nowMonth 是真实月份
        );
    
    // 计算出该月的后一月需要补几天 = 7*6 - 当月的天数 - 前一月补的天数
    let postCount = 42 - dateCount - prevCount;
    // 获取下一个月的date对象
    let postMonthDates: DateObject[] = [...new Array(postCount).keys()].map(
        (value)=>new DateObject(createDate(nowMonth===12?nowYear+1:nowYear,nowMonth===12?1:nowMonth+1,value+1), false, false )// nowMonth 是真实月份
    )
    
    // 返回拼接的数组
    return prevMonthDates.concat(screenDates,postMonthDates)
}


