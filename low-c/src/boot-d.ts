import BootGen from './core/mid/boot';
import { fileDrag } from './util/file-drag';
console.log( "IN-boot-demo run 233" );
const boot = async () => {
    await fileDrag( "Y:/416/$demo/vue-demo/1s", "./repo-template", [ "node_modules" ] );
};

boot();