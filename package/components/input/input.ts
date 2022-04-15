import { isNumber, isString } from "../../core/lib/type-assert"

export const inputProps = {
    type: {
        type: String,
        default: 'text',
        validator(value:string){
            // 密码自带show-passowrd
            return ['text','password'].includes(value)
        }, 
    },
    name:{
        type: String,
    },
    modelValue:{
        type: [String,Number],
        required: true,
    },
    placeholder:{
        type: String,
        default: 'input'
    },
    width:{
        type: Number,
        default: 200,
        validator(value: number){
            return value > 10
        }
    },
    disabled:{
        type: Boolean,
        default: false
    },
    readonly:{
        type: Boolean,
        default: false
    },
    clearable:{// 在type=text的情况下可用
        type: Boolean,
        default: true
    },
    validate:{
        type: Function,
        default: undefined
    },
}

export const inputEmits = {
    change: (newVal: string | number,oldVal: string | number) => (isString(newVal) || isNumber(newVal)) && (isString(oldVal) || isNumber(oldVal)),
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    input: (val: string | number) => (isString(val) || isNumber(val)),
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    'update:modelValue': (val: string | number) => (isString(val) || isNumber(val))
}