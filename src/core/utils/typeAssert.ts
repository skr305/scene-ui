export function isString(value: any): boolean{
    return typeof value === 'string'?true:false
}

export function isNumber(value: any): boolean{
    return typeof value === 'number'?true:false
}

export function isBoolean(value: any): boolean{
    return typeof value === 'boolean'?true:false
}

export function isBooleanArray(arr: boolean[]): boolean{
    arr.forEach((item)=>{
        if(typeof item !== 'boolean')
            return false
    })
    return true
}