import { componentSizes } from "../../core/constants/constant"
import {isString ,isNumber, isBoolean} from '../../core/utils/typeAssert'

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
    border:{//是否显示边框
        type: Boolean,
        default: false
    },
    size:{//Radio 的尺寸
        type: String,
        default: 'default',
        validator(value: string) {
            return componentSizes.includes(value)
        }
    },
    
}

export const radioEmits = {
    // onchange函数的验证函数
    change: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
}