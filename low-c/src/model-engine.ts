import BootGen from "./core/mid/boot";
import { LC_CONFIG_DIR_NAME, TEMPLATE_DIR_NAME } from "./lc-constants";


const boot = async () => {
    const modelPath = `${__dirname}/../${LC_CONFIG_DIR_NAME}/model.json`;
    const operPath = `${__dirname}/../${LC_CONFIG_DIR_NAME}/operation.json`;
    const output = `${__dirname}/../${TEMPLATE_DIR_NAME}/`
    await BootGen( { model: modelPath, operation: operPath }, { output } );
};
export default boot;