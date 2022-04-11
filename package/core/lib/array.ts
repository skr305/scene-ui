
/**
 * 将任意类型的1d数组转换为r行c列的2d数组
 * @param arr 1d数组
 * @param r 行数
 * @param c 列数
 * @returns 2d数组
 */
export function turnTo2dArray<T>(arr: T[],r: number,c: number): Array<Array<T>>{
    let res:T[][] = Array.from(Array(r), () => new Array(c));

    for(let i=0;i<r;i++){
        for(let j=0;j<c;j++){
            res[i][j] = arr[i*c + j]
        }
    }

    return res
}