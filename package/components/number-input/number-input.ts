import { ComponentConstants } from '../../core/constants'; 
import { isNumber } from "../../core/lib/type-assert"

export const numberInputProps = {
    theme: {
        type: String,
        default: 'black',
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
    step: {
        type: Number,
        default: 1,
    },
    max: {
        type: Number,
        default: Infinity,
    },
    min: {
        type: Number,
        default: -Infinity,
    },
    modelValue: {
        type: Number,
        default: 0
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'default',
        validator(value: string) {
            return ComponentConstants.StandardSizeArr.includes(value)
        }
    },
    name: String,
    label: String,
}


export const numberInputEmits = {
    change: (cur: number,prev: number) => isNumber(prev) && isNumber(cur),
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    input: (val: number) => isNumber(val),
    'update:modelValue': (val: number | undefined) =>
      isNumber(val) || val === undefined,
}