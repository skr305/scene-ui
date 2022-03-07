import BaseError from '../error/base-error';
import jsonReader from '../../util/json-reader';
import { MidConfigType } from './type';
import modelGenerator from './gen/model-generator';
import { stdMkdir, stdWriteFileCover } from '../../util/std-write';
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
        if( configBody.Model ) {
            await stdWriteFileCover( MODEL_SQL_OUTPATH, await modelGenerator( configBody.Model ) );
        } 
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