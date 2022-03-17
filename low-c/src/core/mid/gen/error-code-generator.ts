import { ErrorMapBlock } from '../type';

const drawErrorMapToEnum = ( errorMap: ErrorMapBlock, appName: string = "App" ) => {
    // 被嵌入到enum的内容
    let nested = "";
    Object.keys( errorMap ).map( ( errorMean, idx, arr ) => {
        nested += `${errorMean} = ${errorMap[errorMean]}`
        // it isn't the last
        if( idx !== arr.length - 1 ) {
            nested += ",\n"
        } else {
            nested += "\n"
        }
    } );
    return `
export enum ${appName}ErrorCode {
    ${ nested }
};
    `;
};
/**
 * 
 * @param errorMap the errormap in config
 * @param appName app's name, to gened the var-name
 */
const drawErrorCodeMap = (  errorMap: ErrorMapBlock, appName: string = "App"  ): string => {
    return `
export const ${appName}ErroCodeMap = ${ JSON.stringify( errorMap ) };\n
    `;
};
/**
 * 
 * @param errorMap the errormap in config
 * @returns gened file that be stringfy
 */
const boot = ( errorMap: ErrorMapBlock, appName: string = "App" ):string => {
    let result = `
${ drawErrorMapToEnum( errorMap, appName ) }
${ drawErrorCodeMap( errorMap, appName ) }    
    `;
    return result;
};
export default boot;