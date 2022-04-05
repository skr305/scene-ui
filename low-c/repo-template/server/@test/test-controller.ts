import dataSource from '../data-source';
import User from '../entity/AppUser.entity';
import chalk from 'chalk';
export default class TestController {
    public static async mixinTest() {
        const inserting = new User();
        inserting.userID = "245";
        inserting.usernick = "Huang Zian";
        const result = await dataSource.manager.find( User, { where: { userID: "245" }, order: { "userID": "ASC" } } );
        console.log( chalk.cyanBright( `found: ${JSON.stringify( result )}` ) );
        if( !result.length ) {
            await dataSource.manager.insert( User, inserting );
            console.log( chalk.blueBright( "resolve inserting" ) );
            console.log( chalk.cyanBright( `found: ${JSON.stringify( await dataSource.manager.find( User, { where: { userID: "245" } } ) )}` ) );
        }
        await dataSource.createQueryBuilder()
        .delete()
        .from( User )
        .where( "userID = :userID", { userID: "245" })
        .where( "usernick = :usernick", { usernick: "Huang Zian" } )
        .execute();
        const isDeleteSuc = await dataSource.manager.find( User, { where: { userID: "245" } } );
        console.log( isDeleteSuc );
    };
}