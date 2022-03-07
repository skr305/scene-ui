import { XLS_ERROR_CODE_SET } from "./error-code";
class BaseError {
    message: string = "";
    errorCode: XLS_ERROR_CODE_SET;
    constructor( errorCode: XLS_ERROR_CODE_SET, message: string = "" ) {
        console.error( "app-error emit:", `code:${ errorCode }`, `message: ${message}` );
        this.errorCode = errorCode;
        this.message = message;
    };
};
export default BaseError;