import BootGen from "./core/mid/boot";
import { LC_CONFIG_DIR_NAME, TEMPLATE_DIR_NAME } from "./lc-constants";


const boot = async () => {
    const inputFilePath = `${__dirname}/../${LC_CONFIG_DIR_NAME}/model.json`;
    const output = `${__dirname}/../${TEMPLATE_DIR_NAME}/`
    await BootGen( inputFilePath, { output } );
};
export default boot;