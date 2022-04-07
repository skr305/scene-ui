import { OperationBlock } from '../../type';
const boot = ( root: OperationBlock ): string => {
    let result = "";
    [ "Auth", "Unauth" ].map( ( fp: "Auth" | "Unauth" ) => {
        Object.keys( root.Api[fp] ).map( ( cp ) => {
            const p = root.Api[fp][cp].Params;
            const r = root.Api[fp][cp].Response;
            if( p ) {
                result += `
export type ${ cp }Params = ${ p };                `
            }
            if( r ) {
                result += `
export type ${ cp }Response = ${ r };                `
            }
        } );
    } );
    return result;
};
export default boot;