import { ComponentConstants } from "../../core/constants";
import { DefaultColor} from '../../core/constants/constants';

export const datetimeProps = {
    modelValue:{
        type: Date,
        required: true,
    },
    name:{//随表单一起提交的原生的name属性
        type: String,
        required: true,
    },
    placeholder:{
        type: String,
    },
    theme: {
        type: String,
        default: DefaultColor,
        required: false,
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
}

export const datetimeEmits = {
    change: (newVal: Date,oldVal: Date) => newVal instanceof Date && oldVal instanceof Date,
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    'update:modelValue': (val: Date) => val instanceof Date
}