import { ModelConfigType } from "../../type";
import entityGenerator from "../entity-generator";
import { stdWriteFileCover } from '../../../../util/std-write';

/**
 * 
 * @param model the entity need to be gened
 * @param outDirPath where should be out put
 */
const boot = async ( model: ModelConfigType, outDirPath: string = "", appName: string = "App" ) => {
    // the method to get the entity name
    const getEntityFileName = ( key: string ) => {
        return `${ key }.entity.ts`
    };
    const entityRawMeta = await entityGenerator( model );
    Object.keys( entityRawMeta ).map( async( entKey ) => { 
        const fileName = getEntityFileName( entKey );
        await stdWriteFileCover( `${ outDirPath }/${fileName}`, entityRawMeta[ entKey ] );
    } );
};
export default boot;