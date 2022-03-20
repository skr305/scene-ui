import BootGen from './core/mid/boot';

console.log( "IN-boot-demo run 233" );
const boot = async () => {
    const result = await BootGen( './model.json' );
    console.log( result );
};

boot();