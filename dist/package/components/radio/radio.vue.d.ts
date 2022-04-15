declare const _default: import("vue").DefineComponent<{
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
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
    border: {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: string | number | boolean) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
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
    border: {
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
}, {
    theme: string;
    size: string;
    disabled: boolean;
    border: boolean;
}>;
export default _default;
