"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError {
    constructor(errorCode, message = "") {
        this.message = "";
        console.error("app-error emit:", `code:${errorCode}`, `message: ${message}`);
        this.errorCode = errorCode;
        this.message = message;
    }
    ;
}
;
exports.default = BaseError;
