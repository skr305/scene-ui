import KoaRouter from '@koa/router';
import AuthController from '../auth-controller';
import UnauthController from '../unauth-controller';
import koaAppToken from '../middlewares/app-token';

const authRouter = new KoaRouter();
authRouter.use( koaAppToken );
const unauthRouter = new KoaRouter();

authRouter.post( "/get", AuthController.findAllUser );

const router = new KoaRouter();
router.use( "/auth", authRouter.routes() );
router.use( "/unauth", unauthRouter.routes() );
const apiRoutes = router.routes();
export default apiRoutes;