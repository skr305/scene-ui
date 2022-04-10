import Koa from "koa";
import koaCors from "@koa/cors";
import koaRouter from '@koa/router';
import AppContext from './app-context';
import apiRoutes from "./api-router";
import koaErrorHandler from './middlewares/error-handler';
import koaResponse from './middlewares/response';
import { initDataSource } from './data-source';
import chalk from "chalk";

// app config initialize
const app = new Koa<any, AppContext>();
const PORT = 9000;
const ROUTER_PATH = "/api";

const boot = async () => {
    try {
        console.log( chalk.bgYellow.cyan.bold( "loading the data source..." ) );
        await initDataSource();
    } catch ( error ) {
        console.log( `${chalk.bgRedBright.blue( "error emit when " )} ${chalk.bgCyan.red( "load datasource" )}` );
        console.error( error );
    }

    app.use( koaCors() );
    app.use( koaErrorHandler() );
    // app.use( koaAppToken() );
    app.use( koaResponse() );

    // router
    const router = new koaRouter();
    router.use( ROUTER_PATH, apiRoutes );
    app.use( router.routes() ).use( router.allowedMethods() ); 
    app.listen( PORT );
    console.log( chalk.bgBlue.green.bold( "LISTENING " + PORT ) );
};
export default boot;
