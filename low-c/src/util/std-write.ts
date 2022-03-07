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
// append the content to the last
export const stdWriteFilePush = ( path: string, content: string ) => stdWriteFile( path, content, { "flag": "a+" } );
export const stdMkdir = ( path: string, options: fs.MakeDirectoryOptions = { "recursive": true } ) => {
    return fs.promises.mkdir( path, options );
};
// like rm -rf
export const stdRmRf = ( path: string, options: fs.RmOptions = {} ) => {
    return fs.promises.rm( path, { recursive: true, force: true, ...options } );
};