import modelEngine from './model-engine';
import chalk from 'chalk';

console.log( "IN-boot-demo run 233" );
const boot = async () => {
    await modelEngine();
    console.log( chalk.blueBright( "finish" ) );
};

boot();