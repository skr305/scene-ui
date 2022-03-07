import { DbAvailableSectionOutpose, MODEL_DATABASE_KEY, MODEL_DATABASE_COVER } from './constants';
export type ModelOutposeSectionConfigType = {
    type: DbAvailableSectionOutpose,
    isID: boolean
};
// the config of the model 

export type ModelConfigType = {
    [ MODEL_DATABASE_KEY ]: string;
    [ MODEL_DATABASE_COVER ] ?: boolean;
    tables ?: { [ tableName: string ]: { [ sectionName: string ]: DbAvailableSectionOutpose | ModelOutposeSectionConfigType } };
};

// the config to the operation

// atom operation cell
export interface OperaionOutposeCell<R = any, D = any, E = any> {
    Response: R;
    Data: D;
    ExtraData: E;
};
export type OpeationRouterCell = {
    // /auth: { /v1: { ... } }, /auth: { login: {} }
    // 2 situation available
    // if the path key start with "/", it will be recg as a routercell 
    [path: string]: OpeationRouterCell | OperaionOutposeCell
};
export type OperationBlock = {
    // the server's default site
    // first is the pr env, sec is the dev env
    $BaseURL: [ string, string ];
    Router ?: OpeationRouterCell;
};
// the type of the config
/**
 * 可以被接受的config对象
 */
export type MidConfigType = {
    AppName: string;
    // the error code enum generator
    ErrorCode?: { [ MEAN: string ]: number };
    Model?: ModelConfigType
    Operation?: OperationBlock;
};