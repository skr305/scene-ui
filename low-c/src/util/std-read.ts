import fs from 'fs';

// the data be trans out is the string (Buffer to string)
// trans out buffer when config raw to true
export const stdReadFile = ( pathname: string, raw:boolean = false ) => new Promise( ( resolve, reject ) => {
    fs.readFile( pathname, function ( err, data ) {
        if( err ) {
            return reject( err );
        }
        const transout = raw ? data : data.toString( 'utf8' );
        resolve( transout );
    } );
} );
// yield out the array of filename
export const stdReadDir = ( pathname: string ) => new Promise( ( resolve, reject ) => {
    fs.readdir( pathname, function ( err, data ) {
        if( err ) {
            return reject( err );
        }
        const transout = data;
        resolve( transout );
    } );
} );