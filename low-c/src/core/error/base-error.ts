class BaseError {
    message: string = "";
    errorCode: XLS_ERROR_CODE_SET;
    constructor( errorCode: XLS_ERROR_CODE_SET, message: string = "" ) {
        this.errorCode = errorCode;
        this.message = message;
    };
};
export default BaseError;