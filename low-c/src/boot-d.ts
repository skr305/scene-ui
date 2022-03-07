import BootGen from './core/mid/boot';

console.log( "IN-boot-demo run" );
const boot = async () => {
    const result = await BootGen( './model.json' );
    console.log( result );
};
boot();