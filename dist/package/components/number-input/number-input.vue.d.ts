declare const _default: import("vue").DefineComponent<{
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
    };
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
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    name: StringConstructor;
    label: StringConstructor;
}, {
    input: import("vue").Ref<HTMLInputElement | undefined>;
    increase: () => void;
    decrease: () => void;
    handleInput: (event: InputEvent) => void;
    handleFocus: (event: MouseEvent) => void;
    handleBlur: (event: MouseEvent) => void;
    handleInputChange: (event: Event) => void;
    focus: () => void;
    blur: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (cur: number, prev: number) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    input: (val: number) => boolean;
    'update:modelValue': (val: number | undefined) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
    };
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
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    name: StringConstructor;
    label: StringConstructor;
}>> & {
    onChange?: ((cur: number, prev: number) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((val: number | undefined) => any) | undefined;
    onInput?: ((val: number) => any) | undefined;
}, {
    theme: string;
    size: string;
    disabled: boolean;
    modelValue: number;
    max: number;
    min: number;
    step: number;
}>;
export default _default;
