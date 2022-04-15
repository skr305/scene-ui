/**
 * 标准主题色
 */
export type StandardColor = "main" | "info" | "success" | "warning" | "error";
export const DefaultColor = "main";
export const ThemeColorMap =new Map([
    ['main','#aa00ff'],
    ['info','#263238'],
    ['success','#00c853'],
    ['warning','#ffab00'],
    ['error','#d50000'],
    ['main-dark','#7200ca'],
    ['info-dark','#000a12'],
    ['success-dark','#009624'],
    ['warning-dark','#c67c00'],
    ['error-dark','#9b0000'],
    ['main-light','#e254ff'],
    ['info-light','#4f5b62'],
    ['success-light','#5efc82'],
    ['warning-light','#ffdd4b'],
    ['error-light','#ff5131'],
])
/**
 * 标准主题色的数组形式
 */
export const StandardColorArr = ["main","info","success","warning","error"]
/** 
 * 标准大小
 */
export type StandardSize = "large" | "default" | "small"; 
export const DefaultSize = "default";
/**
 * 标准大小的数组形式
 */
export const StandardSizeArr = ['default', 'small', 'large']

