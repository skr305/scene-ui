import TestController from './@test/test-controller';
import { initDataSource } from './data-source';
const boot = async () => {
    await initDataSource();
    await TestController.mixinTest();
};
boot();