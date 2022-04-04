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
 * 根据当前的date对象获取年月日
 * @param date 当前的date对象
 * @returns 年月日数组
 */
function getYearMonthDate(date: Date): number[]{
    return [date.getFullYear(),date.getMonth()+1,date.getDate()]
}

/**
 * 判断是否是闰年
 * @param year
 * @returns 
 */
function isLeapYear(year:number): boolean{
    //能被4整除却不能被100整除或能被400整除的年份就是闰年
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}

/**
 * 根据年月获取该月的天数
 * @param year 
 * @param month 
 * @returns 
 */
function getDateCountByYearAndMonth(year: number, month: number): number{
    // 该年是否是闰年
    if(isLeapYear(year))
        return leapYearMap.get(month.toString())!
    else
        return commonYearMap.get(month.toString())!
}

/**
 * 根据一个date对象获取 日期显示器一页的天数
 * @param date 
 * @returns 日数组
 */
export default function getFullScreen(date: Date){
    let [nowYear, nowMonth, nowDate] = getYearMonthDate(date);

    // 一个展示屏的所有天数
    let screenDates:number[];
    // 该月有多少天
    let dateCount = getDateCountByYearAndMonth(nowYear,nowMonth);
    //[...Array.from(new Array(10).keys())] 快速生成天数数组
    screenDates = [...Array.from(new Array(dateCount).keys())].map((value)=>value += 1)

    // 计算该月首尾是星期几，这里使用year,month,day的参数注意时区问题：
    // 当Date作为构造函数调用并传入多个参数时，所定义参数代表的是当地时间。如果需要使用世界协调时 UTC，使用 new Date(Date.UTC(...)) 和相同参数。
    let monthStartDay = new Date(Date.UTC(nowYear,nowMonth-1,1)).getDay();
    let monthEndDay = new Date(Date.UTC(nowYear,nowMonth-1,screenDates[screenDates.length-1])).getDay();

    // 计算出该月的前一月需要补几天
    let previousMonthDateCount = monthStartDay - 1;
    let previousMonthDates = []
    for(let i=previousMonthDateCount - 1;i>=0;i--)
        previousMonthDates.push(getDateCountByYearAndMonth(nowYear,nowMonth - 1) - i);

    // 计算出该月的后一月需要补几天 = 7*6 - 当月的天数 - 前一月的天数
    let postMonthDateCount = 42 - dateCount - previousMonthDateCount
    let postMonthDates = [...Array.from(new Array(postMonthDateCount).keys())].map((value)=>value += 1)

    // 返回拼接的数组
    return previousMonthDates.concat(screenDates,postMonthDates)
}


