import vueGen from "./core/vue-generator/generator";

console.log( "IN-boot-demo run" );
const boot = async () => {
    const result = await vueGen( './12345.json' );
    if(result === 1)
        console.log("test success!")
};

boot();