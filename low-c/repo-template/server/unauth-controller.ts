import dataSource from './data-source';
import User from './entity/AppUser.entity';
import AppContext from './app-context';
import { Next } from 'koa';
export default class UnauthController {
    // @P( .. )
    public static async findAllUser( ctx: AppContext, next: Next ) {
        ctx.body = await dataSource.manager.find( User );
        console.log( ctx.body );
        await next();
    };
    // 删除操作 插入操作 查找操作 更改操作(暂略)
    // 实体保存语言
    static async getAllUserID( ctx: AppContext, next: Next ) {
        const rowData = await dataSource.manager.find( User );
        ctx.body = rowData.map( row => {
            const { userID } = row;
            return { userID }
        } );
        await next();
    }
};