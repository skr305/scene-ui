import BaseError from 'core/error/base-error';
import { XLS_ERROR_CODE_SET } from 'core/error/error-code';
import { isString } from 'lodash';
import { OperationBlock } from '../../type';
import { compileSentenceToToken, PreHandlingStringWithVarName, MethodGenerator, MethodType, OperationGenerator, OPERATION_TYPE, OperationReturnValue } from './util';

const compileSingleProgram = ( spr: string ):string => {
    const afterVarReplace = PreHandlingStringWithVarName( spr );
    // 视为js语句
    if( afterVarReplace[0] !== "#" ) {
        return afterVarReplace;
    }
    const token = compileSentenceToToken( afterVarReplace );
    // 执行操作/方法的核心语句
    let coreHandling = "";
    if( token.isMethod ) {
        if( token.methodMeta ) {
            const meta = token.methodMeta;
            const methodBody = MethodGenerator[ meta.methodName as MethodType ];
            try {
                coreHandling = methodBody( meta.params );
            } catch ( error ) {
                throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, `compiling ${ meta.methodName } , method name no exist or method compiling error` );
            }   
            
        } else {
            throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling method, method meta losing" );
        }
        
    } else {
        if( token.operationMeta ) {
            const meta = token.operationMeta;
            const operationBody = OperationGenerator[ meta.operaionName as OPERATION_TYPE ];
            try {
                coreHandling = operationBody( meta.base ,meta.params );
            } catch ( error ) {
                throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, `compiling operation ${ meta.base }: ${ meta.operaionName } , oper name no exist or oper compiling error` );
            }   
            
        } else {
            throw new BaseError( XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling operation, operation meta losing" );
        }
    }
    // 存在赋值
    if( token.varName !== undefined ) {
        return  `let ${ token.varName } = ${ coreHandling };` ;
    }
    return coreHandling;
}
const compileProgram = ( prs: string[] ) => {
    let result = "";
    prs.map( pr => {
        result += `${compileSingleProgram( pr )}\n`;
    } )
    return result;
};
/**
 * 
 * @param root 
 * @param entityList 所有实体的名称
 * @returns 
 */
const boot = ( root: OperationBlock, entityList: string[] ): { [key in "Auth" | "Unauth"]: string } => {
    const result = {
        "Auth": "",
        "Unauth": ""
    };
    [ "Auth", "Unauth" ].map( ( fp: "Auth" | "Unauth" ) => {
        let nested = "";
        Object.keys( root.Api[fp] ).map( ( cp ) => {
        const pr = root.Api[fp][cp].Program;
            nested += `
public static async ${ cp } ( ctx: AppContext, next: Next ) {
    ${ pr ? compileProgram( pr ) : "" }
    await next();
};
            `;
    } );
    result[ fp ] = `
${ entityList.map( en => {
    return `
import ${ en } from './entity/${en}.entity'; `
} ).join( "" ) }
import dataSource from './data-source';
import AppContext from './app-context';
import { Next } from 'koa';
import { compileSentenceToToken, PreHandlingStringWithVarName } from './util';
import GenID from './gen-id';
import { XLS_ERROR_CODE_SET } from '../../../error/error-code';
import { OperatorType } from '../../../vue-generator/type';
export default class ${fp}Controller {
    ${ nested }
};
        `
    } );
    return result;
};
export default boot;