// json中各block的声明
export const MODEL_OUTPOSE = "Model";
export const OPERATION_OUTPOSE = "Operation";
export const ERROR_CODE_MEAN_OUTPOSE = "ErrorCodeMean";
export const MODEL_DATABASE_KEY = "$Database";
export const MODEL_DATABASE_COVER = "$Cover";
export const OPERATION_BASEURL_KEY = "$BaseURL";

export type DbOutposeTypeMidType = {
    dbType: string;
    outposeName: string;
};

export const MODEL_LONG_STRING_NAME = "longstring";
export const MODEL_STRING_NAME = "string";
export const MODEL_LONG_INT_NAME = "longint";
export const MODEL_INT_NAME = "int";
// depre
// Model中的db类型中介声明类型
// long string
export const LONG_STRING_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `text`,
    outposeName: MODEL_LONG_STRING_NAME
};
// string
const STRING_VARCAHR_LENGTH = 300;
export const STRING_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `varchar(${STRING_VARCAHR_LENGTH})`,
    outposeName: MODEL_STRING_NAME
};
// int
const INT_OUTPOSE_LENGTH = 20;
export const INT_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `int(${INT_OUTPOSE_LENGTH})`,
    outposeName: MODEL_INT_NAME
};
// long int 
const LONG_INT_OUTPOSE_LENGTH = 40;
export const LONG_INT_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `int(${LONG_INT_OUTPOSE_LENGTH})`,
    outposeName: MODEL_LONG_INT_NAME
};
export const MODEL_OUTPOSE_MAPS = {
    [MODEL_INT_NAME]: INT_OUTPOSE,
    [MODEL_STRING_NAME]: STRING_OUTPOSE,
    [MODEL_LONG_INT_NAME]: LONG_INT_OUTPOSE,
    [MODEL_LONG_STRING_NAME]: LONG_STRING_OUTPOSE
};
export const MODEL_TYPES_MAPS = {
    [MODEL_INT_NAME]: "number",
    [MODEL_STRING_NAME]: "string",
    [MODEL_LONG_INT_NAME]: "number",
    [MODEL_LONG_STRING_NAME]: "string"
};
// all available type
export type DbAvailableSectionOutpose = "longstring" | "longint" | "int" | "string";
