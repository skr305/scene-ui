import DEMO_MARK from './demo-mark';
import { stdWriteFileCover } from './util/std-write';

console.log( DEMO_MARK );
console.log( "IN-boot-demo run" );
const boot = async () => {
    const result = await stdWriteFileCover( "std-demo-write.txt", "我是一只大土狗" );
    console.log( result );
};
boot();