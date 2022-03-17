import { DbAvailableSectionOutpose, MODEL_TYPES_MAPS } from '../constants';
import { ModelConfigType, ModelOutposeSectionConfigType } from '../type';

/**
 * 
 * @param model 需要生成的对应实体模型
 * @returns Map{ path: string: string } ()
 */
const boot = ( model: ModelConfigType ) => {
    const output:{ [key: string]: string } = {};
    // gen the orm annotation
    const PRIMARY_KEY_ANO = "@PrimaryColumn()";
    const COLUMN_ANO = "@Column()"
    const drawEntityAno = ( tableKey: string ) => {
        return `
Entity(\"${tableKey}\")`;
    }
    // reuse in the file begin
    const META_IMPORT = `
import { Entity, Column, PrimaryColumn } from 'typeorm';
    `;
    const tables = model.tables;
    if( tables ) {
        Object.keys( tables ).map( ( tableKey: string ) => {
            let nested = "";
            const tableData = tables[ tableKey ];
            Object.keys( tableData ).map( ( sectionKey: DbAvailableSectionOutpose ) => {
                const sectionOutpose = tableData[ sectionKey ] as ModelOutposeSectionConfigType;
                // if it's not a configType
                if( sectionOutpose.isID === undefined ) {
                   nested += `
${ COLUMN_ANO }
${ sectionKey }: ${ MODEL_TYPES_MAPS[ tableData[ sectionKey ] as DbAvailableSectionOutpose ] };\n
                    `
                
                } else {
                   nested += `
${ sectionOutpose.isID ? PRIMARY_KEY_ANO : COLUMN_ANO }
${ sectionKey }: ${ MODEL_TYPES_MAPS[ sectionOutpose.type as DbAvailableSectionOutpose ] };\n
`
                }
            } );
            output[ tableKey ] = `
${ META_IMPORT }

${drawEntityAno( tableKey )}
export default class {
    ${ nested }
};            
            `;
        } );
    }
    return output;
};
export default boot;