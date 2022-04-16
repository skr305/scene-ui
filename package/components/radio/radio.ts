import { ComponentConstants } from '../../core/constants'; 
import {isString ,isNumber, isBoolean} from "../../core/lib/type-assert"

export const radioProps = {
    modelValue:{//单选框绑定的值
        type:[String,Number,Boolean],
        required: true,
    },
    name:{//随表单一起提交的原生的name属性
        type: String,
        required: true,
    },
    label:{//单选框的文本
        type: String,
        required:true,
    },
    disabled:{//是否禁用单选框
        type: Boolean,
        default: false
    },
    size:{//Radio 的尺寸
        type: String,
        default: 'default',
        validator(value: string) {
            return ComponentConstants.StandardSizeArr.includes(value)
        }
    },
}

export const radioEmits = {
    // onchange函数的验证函数
    change: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
}