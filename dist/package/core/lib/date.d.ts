/**
 * 用于日期时间选择器
*/
export declare const englishMonths: Map<string, string>;
/**
 * 根据年月获取该月的天数
 * @param year
 * @param month 从1开始月
 * @returns
 */
export declare function getDateCountByYearAndMonth(year: number, month: number): number;
/**
 * 日期时间选择器的时间对象
 */
export declare class DateObject {
    date: Date;
    isCurrentMonth: boolean; /** 控制CSS显示不是本月份的日期 */
    isSelected: boolean; /** 控制CSS显示被选中的日期 */
    constructor(date: Date, isCurrentMonth: boolean, isSelected: boolean);
}
/**
 * 根据当前的date对象获取年月日时分秒
 * @param date
 * @returns 年月（从1开始月）日时分秒
 */
export declare function getYearMonthDateHourMinuteSecond(date: Date): number[];
/**
 * 使用字符串模板创建一个 date 对象
 * @param year
 * @param month 从1开始月
 * @param date
 * @param hour
 * @param minute
 * @param second
 */
export declare function createDate(year: number, month: number, date: number, hour?: number | undefined, minute?: number | undefined, second?: number | undefined): Date;
/**
 * 根据一个date对象获取 日期显示器一页的天数
 * @param date
 * @returns 日数组
 */
export declare function getFullScreen(date: Date): DateObject[];
