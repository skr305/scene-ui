declare const _sfc_main: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
}, {
    root: import("vue").Ref<HTMLInputElement | undefined>;
    styleObj: {
        padding?: string | undefined;
        fontSize: string;
        color: string | undefined;
    };
    icon: import("vue").Slot | undefined;
    handleClick: (evt: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
}>> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    type: string;
    theme: string;
    size: string;
    disabled: boolean;
    nativeType: string;
}>;
export default _sfc_main;
