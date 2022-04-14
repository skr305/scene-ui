import { isString } from "../../core/lib/type-assert"

export const textareaProps = {
    name:{
        type: String,
    },
    modelValue:{
        type: String,
        required: true,
    },
    placeholder:{
        type: String,
        default: 'Input'
    },
    width:{
        type: Number,
        default: 200,
        validator(value: number){
            return value > 0
        }
    },
    height:{
        type: Number,
        default: 200,
        validator(value: number){
            return value > 0
        }
    },
    maxLength:{
        type: Number,
        validator(value: number){
            return value > 0
        }
    }
}

export const textareaEmits = {
    change: (newVal: string,oldVal: string) => isString(newVal) && isString(oldVal),
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    input: (val: string) => isString(val),
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    'update:modelValue': (val: string) => isString(val)
}