// json中各block的声明
const MODEL_OUTPOSE = "Model";
const OPERATION_OUTPOSE = "Operation";
const ERROR_CODE_MEAN_OUTPOSE = "ErrorCodeMean";

export type DbOutposeTypeMidType = {
    dbType: string;
    outposeName: string;
};
// Model中的db类型中介声明类型
// long string
export const LONG_STRING_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `text`,
    outposeName: "longstring"
};
// string
const STRING_VARCAHR_LENGTH = 1000;
export const STRING_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `varchar(${STRING_VARCAHR_LENGTH})`,
    outposeName: "string"
};
// int
const INT_OUTPOSE_LENGTH = 20;
export const INT_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `int(${INT_OUTPOSE_LENGTH})`,
    outposeName: "int"
};
// long int 
const LONG_INT_OUTPOSE_LENGTH = 40;
export const LONG_INT_OUTPOSE:DbOutposeTypeMidType = {
    dbType: `int(${LONG_INT_OUTPOSE_LENGTH})`,
    outposeName: "longint"
};

// all available type
export type DbAvailableSectionOutpose = "longstring" | "longint" | "int" | "string";
