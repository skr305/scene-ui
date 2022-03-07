import fs from 'fs';


export const stdWriteFile = ( path: string, content: string, options: fs.WriteFileOptions = {} ) => new Promise( ( resolve, reject ) => {
    fs.writeFile( path, content, options, ( err ) => {
        if( err ) {
            return reject( err );
        }
        resolve( true );
    } );
} );
// alias of optioned flag: w+
export const stdWriteFileCover = ( path: string, content: string ) => stdWriteFile( path, content, { "flag": "w+" } );
// alias of optioned flag: a+
export const stdWriteFilePush = ( path: string, content: string ) => stdWriteFile( path, content, { "flag": "a+" } );