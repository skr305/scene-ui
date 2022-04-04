import BaseError from '../../../error/base-error';
import { XLS_ERROR_CODE_SET } from '../../../error/error-code';
// 编译一个单独的operation语料
// 需要经过$<>变量替换的语料
// 即$变量已经经过预处理替换
export const compileOneOperationSentence = ( sentence: string ) => {
    let result = ""; // 编译解析的结果
    // 赋值语句之后
    const afterGive = sentence.split( "=>" );
    let baseS = "";  // 数据库语句 如 $User.xx|name=
    if( afterGive.length === 1 ) {
        baseS = afterGive[0].trim();
    } else if ( afterGive.length === 2 ) {
        baseS = afterGive[1].trim();
    } else {
        // 需要报个错
        throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, `invalid s: ${sentence}` );
    }
    const afterBase = baseS.split( "|" );
    if( !afterBase.length ) {
        throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, `invalid s: ${sentence}` );
    }
    const metaBaseOperation = afterBase[0].trim(); // $User.FindOne这样的操作 //这时User已经被编译成Manager了
    let queryParamsNested = "";
    metaBaseOperation.split(".").map( ( val, idx ) => {
        if( !idx ) {
            return;
        }
        queryParamsNested += val.
    });
};