import { ComponentConstants } from "../../core/constants";
import { DefaultColor, DefaultSize } from '../../core/constants/comp';
import { isBoolean } from '../../core/utils/typeAssert';

export const checkBoxBtnProps = {
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
    },

    leftBorderRound: {
        type: Boolean,
        default: false,
        required: false
    },

    rightBorderRound: {
        type: Boolean,
        default: false,
        required: false
    }

};

export const checkBoxBtnEmits = {
    change: isBoolean
};