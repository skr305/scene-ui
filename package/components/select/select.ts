import { isString, isBooleanArray } from "../../core/lib/type-assert"

export const selectProps = {
    modelValue:{//选择器绑定的值
        type:[String,Number,Boolean,Array],
        required: true,
    },
    options:{// 选择器的选项
        type: Array,
        required: true,
        validator(value: string[]){
            return value.length>0
        }
    },
    disabledOptions:{
        type: Array,
        default:[],
        validator(value: boolean[]){
            return isBooleanArray(value)
        }
    },
    name:{//随表单一起提交的原生的name属性
        type: String,
        required: true,
    },
    disabled:{//选项有禁用状态
        type: Boolean,
        default: false
    },
    placeholder:{
        type: String,
        default: 'Select',
    },
    multiple:{// 是否多选
        type: Boolean,
        default: false
    },
    multipleLimit:{// 多选的最大选择数
        type: Number,
        default: 1
    },
    collapseTags:{// 多选时是否将选中值按文字的形式展示
        type: Boolean,
        default: false
    }
}


export const selectEmits = {
    change: (val: string) => isString(val),
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    'update:modelValue': (val: string | string[]) => true
}