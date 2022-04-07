import { OperationBlock } from '../../type';
const boot = ( oper: OperationBlock ): string => {
    let result = `
import KoaRouter from '@koa/router';
import AuthController from '../auth-controller';
import UnauthController from '../unauth-controller';
import koaAppToken from '../middlewares/app-token';

const authRouter = new KoaRouter();
authRouter.use( koaAppToken );
const unauthRouter = new KoaRouter();
    `;

    [ "Auth", "Unauth" ].map( ( fp: "Auth" | "Unauth" ) => {
        Object.keys( oper.Api[fp] ).map( ( cp ) => {
            result += `
${ fp.toLowerCase() }Router.post( /${cp}, ${ fp }Controller.${ cp } ); 
            `;
        } );
    } );

    result += `
const router = new KoaRouter();
router.use( "/auth", authRouter.routes() );
router.use( "/unauth", unauthRouter.routes() );
const apiRoutes = router.routes();
export default apiRoutes;
    `
    return result;
};
export default boot;