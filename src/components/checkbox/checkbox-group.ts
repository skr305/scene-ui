import { isString } from '../../core/utils/typeAssert';

export const checkBoxGroupProps = {

    modelValue: {
        type: Array,
        default: false,
        required: false,
        validator(value:Array<any>){
            for( let ele of value ) {
                if( !isString( ele ) ) {
                    return false;
                }
            }
            return true;
        }
    }

};

export const checkBoxGroupEmits = {
    change: (value:Array<any>) => {
        for( let ele of value ) {
            if( !isString( ele ) ) {
                return false;
            }
        }
        return true;
    }
};