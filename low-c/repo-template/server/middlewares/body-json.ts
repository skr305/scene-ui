import AppContext from '../app-context';
import { Next, Middleware } from 'koa';
import koaCompose from 'koa-compose';
import koaBody from 'koa-body'
const koaJson = (): Middleware<any, AppContext> => {
    return async ( ctx, next: Next ) => {
        ctx.json = ctx.request.ctx.body || {};
        await next();
    }
};
export default koaCompose( [ koaJson(), koaBody() ] );