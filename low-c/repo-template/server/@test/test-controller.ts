import dataSource from '../data-source';
import User from '../entity/User.entity';
import chalk from 'chalk';
export default class TestController {
    public static async mixinTest() {
        const inserting = new User();
        inserting.ID = "245";
        inserting.name = "Huang Zian";
        const result = await dataSource.manager.find( User, { where: { ID: "245" }, order: { "ID": "ASC" } } );
        console.log( chalk.cyanBright( `found: ${JSON.stringify( result )}` ) );
        if( !result.length ) {
            await dataSource.manager.insert( User, inserting );
            console.log( chalk.blueBright( "resolve inserting" ) );
            console.log( chalk.cyanBright( `found: ${JSON.stringify( await dataSource.manager.find( User, { where: { ID: "245" } } ) )}` ) );
        }
        await dataSource.createQueryBuilder()
        .delete()
        .from( User )
        .where( "ID = :ID", { ID: "245" })
        .where( "name = :name", { name: "Huang Zian" } )
        .execute();
        const isDeleteSuc = await dataSource.manager.find( User, { where: { ID: "245" } } );
        console.log( isDeleteSuc );
    };
}