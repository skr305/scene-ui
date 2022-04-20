declare const _sfc_main: import("vue").DefineComponent<{
    step: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: StringConstructor;
    label: StringConstructor;
}, {
    input: import("vue").Ref<any>;
    increase: () => void;
    decrease: () => void;
    handleInput: (inputVal: number) => void;
    handleFocus: (event: MouseEvent) => void;
    handleBlur: (event: MouseEvent) => void;
    handleInputChange: (newVal: number, oldVal: number) => void;
    focus: () => void;
    blur: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (cur: number, prev: number) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    input: (val: number) => boolean;
    'update:modelValue': (val: number | undefined) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    step: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: StringConstructor;
    label: StringConstructor;
}>> & {
    onChange?: ((cur: number, prev: number) => any) | undefined;
    "onUpdate:modelValue"?: ((val: number | undefined) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
    onInput?: ((val: number) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: number;
    max: number;
    min: number;
    step: number;
}>;
export default _sfc_main;
