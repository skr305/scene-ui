import BaseError from '../error/base-error';
import jsonReader from '../../util/json-reader';
import { MidConfigType } from './type';
import modelGenerator from './gen/model-generator';
import { stdMkdir, stdWriteFileCover } from '../../util/std-write';
import errorCodeGenerator from './gen/error-code-generator';
import generateEntityToDir from './gen/wrp/generate-entity-to-dir';
import dataSourceOptionGenerator from './gen/data-source-option-generator';

export enum MidGeneratorStatus {
    SUC = 0,
    BAD_PATH = 1,
    UNKNOWN_ERROR = 99,
    APP_ERROR = 100
};
export interface MidGOptions {
    output: string;
}
// default output path
export const DIS_DIR_NAME = "x_mid_dist";
export const DEFAULT_DIST_PATH = `./${DIS_DIR_NAME}`;
const DEFAULT_MIDG_OPTIONS = {
    output: DEFAULT_DIST_PATH
};
/**
 * @param path config.json's path 
 */
export const BootGen = async ( path: string, options: MidGOptions = DEFAULT_MIDG_OPTIONS ):Promise<MidGeneratorStatus> => {
    try {
        // make dist output dir
        const configBody = await jsonReader( path ) as MidConfigType;
        // 
        const OUT_DIR = options.output;
        await stdMkdir( OUT_DIR );
        const APP_NAME = configBody.AppName;
        // write the model in place
        const MODEL_SQL_OUTPATH = `${OUT_DIR}/${APP_NAME}-database.sql`;
        const ERROR_CODE_OUTPATH = `${OUT_DIR}/server/error-code.ts`;
        const ENTITY_OUTPUT_DIR = `${OUT_DIR}/server/entity`;
        const DB_OPTION_OUTPUT_PATH = `${OUT_DIR}/server/data-source-option.ts`;

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
    } catch( error ) {
        if( error instanceof BaseError ) {
            return MidGeneratorStatus.APP_ERROR;
        }
        console.error( error );
        return MidGeneratorStatus.UNKNOWN_ERROR;
    }
    return MidGeneratorStatus.SUC;
};
export default BootGen;