import { componentSizes } from "../../core/constants/constant"
import { isNumber } from "../../core/utils/typeAssert"

export const numberInputProps = {
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
            return componentSizes.includes(value)
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