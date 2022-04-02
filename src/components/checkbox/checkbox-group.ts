import { ComponentConstants } from "../../core/constants";
import { DefaultColor, DefaultSize } from '../../core/constants/comp';
import { isBoolean } from '../../core/utils/typeAssert';

export const checkBoxGroupProps = {

    modelValue: {
        type: Array,
        default: false,
        required: false,
        validator(value:Array<any>){
            for( let ele of value ) {
                if( !isBoolean( ele ) ) {
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
            if( !isBoolean( ele ) ) {
                return false;
            }
        }
        return true;
    }
};