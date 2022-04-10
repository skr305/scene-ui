import BaseError from '../error/base-error';
import jsonReader from '../../util/json-reader';
import { MidConfigType, OperationBlock } from './type';
import modelGenerator from './gen/model-generator';
import { stdMkdir, stdWriteFileCover } from '../../util/std-write';
import errorCodeGenerator from './gen/error-code-generator';
import generateEntityToDir from './gen/wrp/generate-entity-to-dir';
import dataSourceOptionGenerator from './gen/data-source-option-generator';
import ctlGenerator from './gen/operation/ctl-generator';
import basePortGenerator from './gen/operation/base-port-generator';
import apiGenerator from './gen/operation/api-generator';
import routerGenerator from './gen/operation/router-generator';
import getEntityList from './gen/get-entity-list';
import LOW_C_ENV from '../../env';

export enum MidGeneratorStatus {
    SUC = 0,
    BAD_PATH = 1,
    UNKNOWN_ERROR = 99,
    APP_ERROR = 100
};
export interface MidGOptions {
    output: string;
}
export type BootGenCompositionPathType = {
    model: string,
    operation: string
};
// default output path
export const DIS_DIR_NAME = "x_mid_dist";
export const DEFAULT_DIST_PATH = `./${DIS_DIR_NAME}`;
const DEFAULT_MIDG_OPTIONS = {
    output: DEFAULT_DIST_PATH
};
/**
 * @param path config.json's path 
 */
export const BootGen = async ( path: BootGenCompositionPathType, options: MidGOptions = DEFAULT_MIDG_OPTIONS ):Promise<MidGeneratorStatus> => {
    try {
        // make dist output dir
        const configBody = await jsonReader( path.model ) as MidConfigType;
        const operationBody = await jsonReader( path.operation ) as OperationBlock;
        // 
        const OUT_DIR = options.output;
        await stdMkdir( OUT_DIR );
        const APP_NAME = configBody.AppName;
        // write the model in place
        const MODEL_SQL_OUTPATH = `${OUT_DIR}/${APP_NAME}-database.sql`;
        const ERROR_CODE_OUTPATH = `${OUT_DIR}/server/error-code.ts`;
        const ENTITY_OUTPUT_DIR = `${OUT_DIR}/server/entity`;
        const DB_OPTION_OUTPUT_PATH = `${OUT_DIR}/server/data-source-option.ts`;
        
        // operation
        const AUTH_CTL_OUTPATH = `${OUT_DIR}/server/auth-controller.ts`;
        const UNAUTH_CTL_OUTPATH = `${OUT_DIR}/server/unauth-controller.ts`;
        const BASE_PORT_OUTPATH = `${OUT_DIR}/src/base-port.ts`;
        const API_OUTPATH = `${OUT_DIR}/src/api.ts`;
        const ROUTER_OUTPATH = `${OUT_DIR}/server/api-router/index.ts`;

        await stdMkdir( ENTITY_OUTPUT_DIR );
        if( configBody.Model ) { 
            await stdWriteFileCover( MODEL_SQL_OUTPATH, await modelGenerator( configBody.Model ) );
            // generate the entity
            await generateEntityToDir( configBody.Model, ENTITY_OUTPUT_DIR );
        }
        if( configBody.ErrorCode ) {
            await stdWriteFileCover( ERROR_CODE_OUTPATH, await errorCodeGenerator( configBody.ErrorCode ) );
        } 
        // 生成db-option
        await stdWriteFileCover( DB_OPTION_OUTPUT_PATH, await dataSourceOptionGenerator( configBody ) );
        
        // 生成operation相关的代码
        {
            const ctlCode = ctlGenerator( operationBody, getEntityList( configBody ) );
            await stdWriteFileCover( AUTH_CTL_OUTPATH, ctlCode.Auth );
            await stdWriteFileCover( UNAUTH_CTL_OUTPATH, ctlCode.Unauth );
        };
        await stdWriteFileCover( BASE_PORT_OUTPATH, basePortGenerator( operationBody.DevPort ) );
        await stdWriteFileCover( ROUTER_OUTPATH, routerGenerator( operationBody ) );
        await stdWriteFileCover( API_OUTPATH, apiGenerator( operationBody ) );
    } catch( error ) {
        if( LOW_C_ENV === "DEV" ) {
            throw error;
        }
        if( error instanceof BaseError ) {
            return MidGeneratorStatus.APP_ERROR;
        }
        console.error( error );
        return MidGeneratorStatus.UNKNOWN_ERROR;
        
    }
    return MidGeneratorStatus.SUC;
};
export default BootGen;