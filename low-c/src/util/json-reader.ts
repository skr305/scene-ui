import BaseError from 'core/error/base-error';
import { stdReadFile } from './std-read';
const jsonReader = async ( path: string ) => {
    if( path.slice( path.length - 6  ) != ".json" ) {
        throw new BaseError( XLS_ERROR_CODE_SET.FORMAT_ERROR, "jsonreader achieve a file not end by .json" );
    }
    const raw = await stdReadFile( path ) as string;
    return JSON.parse( raw );
};
export default jsonReader;