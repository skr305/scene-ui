import { uniqueId } from 'lodash';
const genID = ( pre: string ) => {
    return `${pre}-${new Date().getTime()}-${uniqueId()}`;
};
export default genID;