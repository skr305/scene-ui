import { promises as fsPromise } from 'fs';
import { normalize } from 'path';
// 把指定目录下的所有文件移动到相应路径下
// example
export const fileDrag = async ( srcPath: string, destinPath: string, ignoreDirs: Array<string> = [] ) => {
    return fsPromise.cp( srcPath, destinPath, { 
        filter: ( source: string ) => {
            let srcPathBlocks = source.split( "\\" );
            for( let igDir of ignoreDirs ) {
                if( srcPathBlocks.includes( igDir ) ) {
                    return false;
                }
            }
            return true;
        },
        recursive: true,
        force: true 
    } );
};