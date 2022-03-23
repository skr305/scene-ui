export const linkProps = {
    href: { type: String, default: '' },
    type: {
        type: String,
        default: 'default',
        validator(value:string){
            return ['primary', 'success', 'warning', 'info', 'danger', 'default'].includes(value);
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