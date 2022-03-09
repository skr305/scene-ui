/**
 * 用于判断一个属性是否在一个对象中
 * 处理错误: 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{}"。
 *          在类型 "{}" 上找不到具有类型为 "string" 的参数的索引签名。ts(7053)
 * @param key 
 * @param object 
 * @returns 
 */
export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}
