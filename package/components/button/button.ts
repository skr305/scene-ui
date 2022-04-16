import { ComponentConstants } from '../../core/constants'; 

export const buttonProps = {
    type:{// 按钮类型
        type: String,
        default: 'default',
        validator(value: string) {
            // 这个值必须与下列字符串中的其中一个相匹配
            return ['default', 'round', 'text', 'circle'].includes(value)
        }
    },
    theme: {
        type: String,
        default: 'main',
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
    size:{// 按钮的尺寸
        type: String,
        default: 'default',
        validator(value: string) {
            return ComponentConstants.StandardSizeArr.includes(value)
        }
    },
    disabled:{// 是否禁用
        type: Boolean,
        default: false,
    },
    nativeType:{// 原生button类型
        type: String,
        default: 'button',
        validator(value: string) {
            return ['button','reset','submit'].includes(value)
        }
    },
}

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}