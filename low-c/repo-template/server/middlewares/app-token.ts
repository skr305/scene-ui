import { Middleware } from 'koa';
import AppContext from '../app-context';
// raw logic 
// need to config
// for a pair
const resolveToken = (token: string): string => token;
export const EncryUserID = ( userID: string ): string => userID;

const koaAppToken = ():Middleware<any, AppContext> => {
    return async( ctx, next ) => {
        if( ctx.token ) {
            ctx.userID = resolveToken( ctx.token );
        }
        await next();
    };
};
export default koaAppToken;