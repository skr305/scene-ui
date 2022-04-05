<<<<<<< HEAD
import { isString } from '../../core/utils/typeAssert';
=======
import { ComponentConstants } from "../../core/constants";
import { DefaultColor, DefaultSize } from '../../core/constants/comp';
import { isBoolean } from "../../core/lib/type-assert";
>>>>>>> 70a7718c1ae061f38638b6c1c15011fdce6a4f8a

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