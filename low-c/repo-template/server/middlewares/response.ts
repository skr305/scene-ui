import { Middleware } from 'koa';
import AppContext from '../app-context';
import ServerError from '../server-error';
import { ServerErrorCode } from '../server-error';
const koaResponse = ():Middleware<any, AppContext> => {
    return async ( ctx, next ) => {
        await next();
        if( !ctx.body ) {
            throw new ServerError( "router not found", ServerErrorCode.NOT_FOUND );
        }
        throw new ServerError( ctx.body, ServerErrorCode.OK );
    };
};
export default koaResponse;