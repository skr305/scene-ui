import { MidConfigType } from '../type';
const getEntityList = ( model: MidConfigType ): string[] => {
    if( model.Model && 
        model.Model.tables ) {
        return Object.keys( model.Model.tables );
    }
    return [];
};
export default getEntityList;