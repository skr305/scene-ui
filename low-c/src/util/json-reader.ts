import BaseError from '../core/error/base-error';
import { stdReadFile } from './std-read';
import { XLS_ERROR_CODE_SET } from '../core/error/error-code';
const jsonReader = async <T = any> ( path: string ): Promise< T > => {
    if( path.slice( path.length - 5  ) != ".json" ) {
        throw new BaseError( XLS_ERROR_CODE_SET.FILE_TYPE_ERROR, "jsonreader achieve a file not end by .json" );
    }
    const raw = await stdReadFile( path ) as string;
    try {
        return JSON.parse( raw ) as T;
    } catch {
        throw new BaseError( XLS_ERROR_CODE_SET.JSON_FORMAT_ERROR, `jsonreader achieve a bad json in ${path}` );
    }
};
export default jsonReader;