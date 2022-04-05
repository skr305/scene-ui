export enum ServerErrorCode {
    // succuess handling
    OK = 0,
    NOT_FOUND = 1,
    UNKNOWN = 999
};
export default class ServerError<T> {
    data: T;
    errorCode: ServerErrorCode;
    constructor( data: T, errorCode = ServerErrorCode.UNKNOWN ) {
        this.data = data;
        this.errorCode = errorCode;
    }
};