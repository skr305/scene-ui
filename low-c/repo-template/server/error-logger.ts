import fs from 'fs';

const ERR_LOG_PATH = './err.log';
const errorLogger = ( message: string, errorBody: any = "" ) => {
    console.error( message, "errorBody: " + JSON.stringify( errorBody ) );
    fs.promises.writeFile( ERR_LOG_PATH, "errorBody: \n" + JSON.stringify( errorBody ) + "\n", { flag: "a+" } );
    fs.promises.writeFile( ERR_LOG_PATH, message, { flag: "a+" } );
};
export default errorLogger; 