import { ComponentConstants } from "../../core/constants";
import { DefaultColor, DefaultSize } from '../../core/constants/comp';
import { isBoolean } from "../../core/lib/type-assert";

export const checkBoxProps = {
    checked: {
        type: Boolean,
        default: false,
        required: false
    },
    
    theme: {
        type: String,
        default: DefaultColor,
        required: false,
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },

    disabled: {
        type: Boolean,
        default: false,
        required: false
    },

    // 是否处于"不确定状态"    
    unsure: {
        type: Boolean,
        default: false,
        required: false
    },

    modelValue: {
        type: Boolean,
        default: false,
        required: false
    },

    size: {
        type: String,
        default: DefaultSize,
        required: false,
        validator(value:ComponentConstants.StandardSize){
            return ComponentConstants.StandardSizeArr.includes(value)
        }
    },

    label: {
        type: String,
        default: "",
        required: false
    }
};

export const checkBoxEmits = {
    change: isBoolean
};