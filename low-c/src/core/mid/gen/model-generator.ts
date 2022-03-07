import { ModelConfigType, ModelOutposeSectionConfigType } from '../type';
import { MODEL_DATABASE_KEY, DbAvailableSectionOutpose, MODEL_OUTPOSE_MAPS } from '../constants';
// draw a sentence like username varchar( 200 ) not null
/**
 * 
 * @param key section name
 * @param type section's type( in app's writing methods )
 * @param isLast need ","?
 * @param notNull is it not null in the sql expression?
 */
const drawOutposeSentence = 
( key: string, outposeType: DbAvailableSectionOutpose, 
isLast: boolean = false, notNull: boolean = true ):string => {
    return ` 
    ${key} ${ MODEL_OUTPOSE_MAPS[ outposeType ].dbType } ${ notNull ? "not null" : "" } ${ isLast ? "" : "," }
     `;
}
/**
 * 
 * @param primarys 主键集
 * @param needComma 是否需要段落的","
 * @returns 生成的primaryKey语句
 */
const drawPrimayKeySentence = ( primarys: Array< string >, needComma: boolean = false ) => {
    let NESTED = "";
    primarys.forEach( ( key, idx ) => {
        NESTED += idx === primarys.length - 1 ? `${key} ` : ` ${key}, `;
    } ) ;
    return `
    primary key ( ${NESTED} ) ${ needComma ? "," : "" }
    `;
}
const modelGenerator = ( config: ModelConfigType ):string => {
    const BASE_NAME = config[MODEL_DATABASE_KEY];
    let GENED = `
${ config?.$Cover ? `drop database \`${BASE_NAME}\`;` : "" }
create database \`${BASE_NAME}\`;
use \`${BASE_NAME}\`;
    `;
    const tables = config.tables;
    // no table to create
    if( !tables ) {
        return GENED;
    }
    // get the key of the table and generate them
    // table's construct is like 
    // create table `xx` (  );
    // so would like to draw the sec into it
    // the last sec no need to add ","
    // every key should be rec as a table
    Object.keys( tables ).map( ( tn: string ) => {
        // like the content in create table ();
        let NESTED = "";
        if( tn != MODEL_DATABASE_KEY ) {
            // how to draw a table by these info
            // a conv method is to cache the info and concat them in the last
            // its a good idea
            const meta = tables[tn];
            let primaryID: Array<string> = [];
            const sections = Object.keys( meta );
            sections.map( ( secKey, idx ) => {
                // judge that if the config body is a configObject
                const secInfo = meta[ secKey ] as ModelOutposeSectionConfigType;
                
                // is a config Object
                if( secInfo.isID !== undefined ) {
                    // primary id can be a tuple of [ sec ]
                    if( secInfo.isID ) {
                        // it's a primary id
                        primaryID.push( secKey );
                    }
                    // here should use local outpose and write before cck the isID
                    const isLast = idx === sections.length - 1 && !primaryID.length;
                    // it's last, no need ","
                    NESTED += drawOutposeSentence( secKey, secInfo.type, isLast );
                } else {
                    // sugar wrting compiler
                    const isLast = idx === sections.length - 1 && !primaryID.length;
                    NESTED += drawOutposeSentence( secKey, meta[ secKey ] as DbAvailableSectionOutpose, isLast );
                }
            } );
            // last should use primary key
            NESTED += drawPrimayKeySentence( primaryID );
        }
        GENED += `
create table \`${tn}\` (
    ${NESTED}
);
        `
} );
    return GENED;
};
export default modelGenerator;