declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    label: {
        type: StringConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
}, {
    handleChange: (evt: MouseEvent) => void;
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: string | number | boolean) => boolean;
    'update:modelValue': (val: string | number | boolean) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        required: boolean;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    label: {
        type: StringConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
}>> & {
    onChange?: ((val: string | number | boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string | number | boolean) => any) | undefined;
}, {
    size: string;
    disabled: boolean;
}>;
export default _sfc_main;
