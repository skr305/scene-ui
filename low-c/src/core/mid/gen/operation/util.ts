// tip
// 1. 建立生成Token的方法
// 2. 建立由Token转编译语句的方法 (方法内)
import BaseError from '../../../error/base-error';
import { XLS_ERROR_CODE_SET } from '../../../error/error-code';

const splitPairSafely = ( stringfiedPair: string ) => {
    const pairs = stringfiedPair.split( "=" ).map( v => v.trim() );
    if( pairs.length !== 2 ) {
        throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, " compiling error: pair wrong, should be <p_name> = <val> " );
    }
    return pairs;
};
const splitAndTrim = ( s: string, sign: string ) => s.split( sign ).map( v => v.trim() );
export interface OperationToken {
    // 要赋值的变量名
    varName: null | string;
    // 是否是诸如^Map这样的方法
    isMethod: boolean;
    // 操作的具体细节
    operationMeta ?: {
        // 操作针对的数据库
        base: string;
        operaionName: string;
        params: Array<string>;
    };
    methodMeta ?: {
        // 操作针对的数据库
        methodName: string;
        params: Array<string>;
    };
};
export type OPERATION_TYPE 
= 
"Find" |
"FindOne" |
"Insert" |
"Delete";
export type FIND_ORDER_VALUE 
=
// a for AES 
// d for desc
"A" |
"a" |
"D" |
"d";
/** deprecated 所有的oper/method 皆是以本身生成的字句作为返回  */
// 如果是null 则无法赋值 应给出warning 且应说明赋值无效
// 如果是string 即是固定值 则会在下一行生成一个新的赋值语句 被赋值即是string
// 如果是函数 则会根据该函数生成的字符串值在本行进行赋值
export const OperationReturnValue: { [key in OPERATION_TYPE]: ( null | ( ( compiled: string ) => string ) | string ) } = {
    "Find": ( compiled: string ) => compiled,
    "FindOne": ( compiled: string ) => compiled,
    "Insert": "true",
    "Delete": "true"
};
export const OperationGenerator:{ [key in OPERATION_TYPE]: ( base: string, params: Array<string> ) => string } = {
    "Find": ( base: string, params: Array<string> ) => {
        let whereNested = "";
        let orderNested = "";
        for( let pair of params ) {
            const condi = splitPairSafely( pair );
            // for order use
            if( condi[0][0] === "*" ) {
                orderNested += `${ condi[0].slice( 1 ) }: ${ condi[1] }, `;
            } else {
                whereNested += `${condi[0]}: ${condi[1]}, `;
            }
            
        }
        return `await dataSource.manager.find( ${base}, { where: { ${whereNested} }, order: { ${orderNested} }  } );`
    },
    "FindOne": ( base: string, params: Array<string> ) => {
        let whereNested = "";
        for( let pair of params ) {
            const condi = splitPairSafely( pair );
            whereNested += `${condi[0]}: ${condi[1]}, `
        }
        return `await dataSource.manager.find( ${base}, { where: { ${whereNested} } } );`
    },
    "Insert": ( base: string, params: Array<string> ) => {
        const TEMP_VAR_NAME = "__inserting";
        let columnSequence = `const ${TEMP_VAR_NAME} = new ${ base } ();\n`;
        for( let pair of params ) {
            const given = splitPairSafely( pair );
            columnSequence += `${TEMP_VAR_NAME}.${given[0]} = ${given[1]};\n`
        }
        columnSequence += `await dataSource.manager.insert( ${base}, ${ TEMP_VAR_NAME } );\n`;
        return columnSequence;
    },
    "Delete": ( base: string, params: Array<string> ) => {
        let whereExposed = "";
        params.every( (pair, idx) => {
            const given = splitPairSafely( pair );
            const whereMethodName = idx === 0 ? "where" : "andWhere";
            whereExposed += `\n.${whereMethodName}("${given[0]}=:${given[0]}", {${given[0]}: ${given[1]}})`;
        });
        return `
        await dataSource
        .createQueryBuilder()
        .delete()
        .from(${base})
        ${whereExposed}
        .execute();
        `
    }
};
export type MethodType 
= 
"GenID" |
"Map";
export const MethodGenerator: { [ key in MethodType ]: ( params: string[] ) => string } = {
    "GenID": ( params: string[] ) => {
        const pre = params[0] || "";
        return ` GenID( ${pre} );`;
    },
    "Map": ( params: string[] ) => {
        let arrName = params[0];
        let fmtAttr = params.slice( 1 ).join( ", " );
        return ` ${arrName}.map( val => { const { ${fmtAttr} } = val; return { ${ fmtAttr } }; } ); `
    }
}
export const SpecificVarname: { [ key: string ]: string } = {
    "$Return": "ctx.body",
    // param或params皆指向ctx.json
    "$Params": "ctx.json",
    "$Param": "ctx.json",
    "$UserID": "ctx.userID"
};
export const VarnameReg = /(\$\w+)/g
export const PreHandlingStringWithVarName = ( sentence: string ) => {
    return sentence.trim().replace( VarnameReg, ( v: string ) => {
        if( v in SpecificVarname ) {
            return SpecificVarname[ v ];
        }
        // 去除$符号
        return v.slice(1);
    } );
};
// 把一个经过变量替换的语句进行Token化
export const compileSentenceToToken = ( sentence: string ) => {
    const result: OperationToken = {
        varName : null,
        isMethod: false
    };

    // 赋值语句之后
    const handleMethodOrOperation = ( s: string ) => {
        try {
            const params = splitAndTrim( s, "|" );
            if( params[0][0] === "^" ) {
                result.isMethod = true;
                result.methodMeta = {
                    methodName: params[0].slice(1),
                    params: params.slice( 1 ),
                }
            } else if( params[0][0] === "&" ) {
                const [ rawBaseName, operationName ] = splitAndTrim( params[0], "." );
                result.isMethod = false;
                result.operationMeta = {
                    operaionName: operationName,
                    params: params.slice( 1 ),
                    base: rawBaseName.slice( 1 )
                }
            } else {
                throw Error();
            };
        } catch( error ) {
            throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, "method and operation sentence error: " + JSON.stringify( error ) );
        }
        
    };
    
    const afterGive = splitAndTrim( sentence, "=>" );
    if( afterGive.length === 1 ) {
        // 没有变量赋值
        result.varName = null;
        handleMethodOrOperation( afterGive[0] );
    } else if ( afterGive.length === 2 ) {
        result.varName = afterGive[0];
        handleMethodOrOperation( afterGive[1] );
    } else {
        // 需要报个错
        throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, `invalid s: ${sentence}` );
    }
    return result;
};