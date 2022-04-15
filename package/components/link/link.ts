import { ComponentConstants } from '../../core/constants'; 

export const linkProps = {
    href: { type: String, default: '' },
    theme: {
        type: String,
        default: 'main',
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
    underline: {
        type: Boolean,
        default: true,
    },
    disabled: { type: Boolean, default: false },
    // icon: {
    //     type: iconPropType,
    //     default: '',
    // },
}

export const linkEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
}