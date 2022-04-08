import { Middleware } from 'koa';
import AppContext from '../app-context';
import ServerError from '../server-error';
import errorLogger from '../error-logger';
import standErrorMessage from '../standard-error-message';
import { ServerErrorCode } from '../server-error';
const koaErrorHandler = ():Middleware<any, AppContext> => {
    return async ( ctx, next ) => {
        try {
            await next();
        } catch ( error ) {
            console.log( error );
            if( error instanceof ServerError ) {
                ctx.body = error;
                if( error.errorCode !== ServerErrorCode.OK ) {
                    errorLogger( standErrorMessage( error.errorCode, JSON.stringify( error.data ) ), error );
                }
            } else {
                ctx.body = new ServerError( "a internal error emit" );
                errorLogger( standErrorMessage( ServerErrorCode.UNKNOWN, "unknown error emit" ), error );
            }
        };
    };
};
export default koaErrorHandler;