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
// deprecated
export type OpeationRouterCell = {
    // /auth: { /v1: { ... } }, /auth: { login: {} }
    // 2 situation available
    // if the path key start with "/", it will be recg as a routercell 
    [path: string]: OpeationRouterCell | OperaionOutposeCell
};
export type AvailableRouter = "Auth" | "Unauth";
export type OperationDefineType = {
    Response?: string,
    Params?: string,
    Program?: Array<string>
};
export type OperationBlock = {
    // the server's default site
    // first is the pr env, sec is the dev env
    DevPort: number;
    Api: { [ routetr in AvailableRouter ]: { [operation: string]: OperationDefineType } };
};
// the type of the config
export type ErrorMapBlock = { [ MEAN: string ]: number };
/**
 * 可以被接受的config对象
 */
export type MidConfigType = {
    AppName: string;
    // the error code enum generator
    ErrorCode?: ErrorMapBlock;
    Model?: ModelConfigType
    Operation?: OperationBlock;
    Cover ?: boolean,
    BaseName: string
};