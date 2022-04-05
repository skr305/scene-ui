import { DataSource } from "typeorm";
import chalk from 'chalk';

// 在数据库已经存在的情况下每次都重新创建 默认不使用
const $COVER:boolean = false;
const DB_NAME = "123-b";

const dataSource = new DataSource( {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": DB_NAME,
    "entities": [ __dirname + "\\entity\\*.entity.js" ],
    "cache": true,
    // here init will be false
    "synchronize": false
} );
export default dataSource;
// init the typeorm
export const initDataSource = async() => {
    let isBaseExist = false;
    try {
        // 用来查看该数据库是否存在
        const queier = new DataSource( { 
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "123456" 
        } );
        await queier.initialize();
        if( $COVER ) {
            await queier.query( `DROP DATABASE IF EXISTS \`${DB_NAME}\`` )
        }
         // 如果该数据库没有被创建 则应该被重新创建
        // 如果被创建了 是否从新重现视$COVER而定
        isBaseExist = ( await queier.query( `SHOW DATABASES LIKE \"${DB_NAME}\"` ) as Array<any> ).length !== 0;
        // 不存在则新建 
        if( !isBaseExist ) {
            await queier.query( `CREATE DATABASE \`${DB_NAME}\`` );
        }
        await queier.destroy();
    } catch ( error ) {
        console.error( error );
        console.error( "please check out the mysql service" );
        console.error( "connection fail when init" );
    }
    try {
        await dataSource.initialize();
        // if not exists
        if( !isBaseExist ) {
            await dataSource.synchronize();
        }
    } catch ( error ) {
        console.error( error );
        console.log( chalk.greenBright( "database connetion failed" ) );
    }
};