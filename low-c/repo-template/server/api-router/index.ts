import KoaRouter from '@koa/router';
import Controller from '../controller';

const router = new KoaRouter();
router.post( "/find_all_users", Controller.findAllUser );
const apiRoutes = router.routes();
export default apiRoutes;