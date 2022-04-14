"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_OUTPOSE_MAPS = exports.LONG_INT_OUTPOSE = exports.INT_OUTPOSE = exports.STRING_OUTPOSE = exports.LONG_STRING_OUTPOSE = exports.MODEL_INT_NAME = exports.MODEL_LONG_INT_NAME = exports.MODEL_STRING_NAME = exports.MODEL_LONG_STRING_NAME = exports.OPERATION_BASEURL_KEY = exports.MODEL_DATABASE_COVER = exports.MODEL_DATABASE_KEY = exports.ERROR_CODE_MEAN_OUTPOSE = exports.OPERATION_OUTPOSE = exports.MODEL_OUTPOSE = void 0;
exports.MODEL_OUTPOSE = "Model";
exports.OPERATION_OUTPOSE = "Operation";
exports.ERROR_CODE_MEAN_OUTPOSE = "ErrorCodeMean";
exports.MODEL_DATABASE_KEY = "$Database";
exports.MODEL_DATABASE_COVER = "$Cover";
exports.OPERATION_BASEURL_KEY = "$BaseURL";
exports.MODEL_LONG_STRING_NAME = "longstring";
exports.MODEL_STRING_NAME = "string";
exports.MODEL_LONG_INT_NAME = "longint";
exports.MODEL_INT_NAME = "int";
exports.LONG_STRING_OUTPOSE = {
    dbType: `text`,
    outposeName: exports.MODEL_LONG_STRING_NAME
};
const STRING_VARCAHR_LENGTH = 300;
exports.STRING_OUTPOSE = {
    dbType: `varchar(${STRING_VARCAHR_LENGTH})`,
    outposeName: exports.MODEL_STRING_NAME
};
const INT_OUTPOSE_LENGTH = 20;
exports.INT_OUTPOSE = {
    dbType: `int(${INT_OUTPOSE_LENGTH})`,
    outposeName: exports.MODEL_INT_NAME
};
const LONG_INT_OUTPOSE_LENGTH = 40;
exports.LONG_INT_OUTPOSE = {
    dbType: `int(${LONG_INT_OUTPOSE_LENGTH})`,
    outposeName: exports.MODEL_LONG_INT_NAME
};
exports.MODEL_OUTPOSE_MAPS = {
    [exports.MODEL_INT_NAME]: exports.INT_OUTPOSE,
    [exports.MODEL_STRING_NAME]: exports.STRING_OUTPOSE,
    [exports.MODEL_LONG_INT_NAME]: exports.LONG_INT_OUTPOSE,
    [exports.MODEL_LONG_STRING_NAME]: exports.LONG_STRING_OUTPOSE
};
