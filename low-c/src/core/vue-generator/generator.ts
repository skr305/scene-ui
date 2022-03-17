import BaseError from "../error/base-error"
import { stdMkdir, stdWriteFileCover } from "../../util/std-write"
import jsonReader from "../../util/json-reader"
import { jsonModel } from "./type"
import { parseTemplate} from "./parse"

// 一个事件的过程
export enum Status{
    CONTINUE = 0,
    SUCCESS = 1,
    UNKNOWN_ERROR = 99,
    APP_ERROR = 100 // 指向 baseError
}
// 导入一个JSON数据 导出.vue文件
export const OUT_PATH: string = `./x_mid_dist/vue_source` // vue文件输出路径

/**
 * 
 * @param path json文件路径
 * @param output 输出vue文件路径
 * 用户的配置需要从json中读取
 * 1. 读取JSON 获取到config与viewModel
 * 2. 根据config查看是否有每个用户对应的文件夹 没有创建，有继续
 * 3. 根据viewModel生成.vue文件
 * 4. 文件保存 结束
 */
export default async function vueGen(path: string):Promise<Status>{
    try{
        // 读取 Json数据 有两部分组成
        const jsonData = await jsonReader(path) as jsonModel
        
        let {username,date,operate} = jsonData.config

        // 创建用户文件夹
        await stdMkdir( OUT_PATH )
        // 拼接vue文件名
        const VUE_FILE_PATH: string = `${OUT_PATH}/${username}-${date.toString()}-${operate}.vue`

        if(jsonData.VNode){
            // 覆盖生成vue文件
            await stdWriteFileCover(VUE_FILE_PATH , parseTemplate(jsonData.VNode))
        }

    }catch(error){
        console.error(error)
        if(error instanceof BaseError){// 基本错误
            return Status.APP_ERROR
        } 
        return Status.UNKNOWN_ERROR// 未知错误
    }
    return Status.SUCCESS// 成功
}