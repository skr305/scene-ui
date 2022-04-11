export const datetimeProps = {
    modelValue:{
        type: Date,
        required: true,
        default: new Date()
    },
    name:{//随表单一起提交的原生的name属性
        type: String,
        required: true,
    },
    placeholder:{
        type: String,
    }
}

export const datetimeEmits = {
    change: (newVal: Date,oldVal: Date) => newVal instanceof Date && oldVal instanceof Date,
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    'update:modelValue': (val: Date) => val instanceof Date
}