declare const _sfc_main: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
    };
    modelValue: {
        type: StringConstructor;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    height: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    maxLength: {
        type: NumberConstructor;
        validator(value: number): boolean;
    };
}, {
    textarea: import("vue").Ref<HTMLTextAreaElement | undefined>;
    updateValue: (event: InputEvent, newVal?: string | undefined) => void;
    handleFocus: (event: MouseEvent) => void;
    handleBlur: (event: MouseEvent) => void;
    focus: () => void;
    blur: () => void;
    inputValue: import("vue").Ref<string>;
    isFocus: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (newVal: string, oldVal: string) => boolean;
    blur: (e: FocusEvent) => boolean;
    input: (val: string) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
    };
    modelValue: {
        type: StringConstructor;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    height: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    maxLength: {
        type: NumberConstructor;
        validator(value: number): boolean;
    };
}>> & {
    onChange?: ((newVal: string, oldVal: string) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
    onInput?: ((val: string) => any) | undefined;
}, {
    width: number;
    height: number;
    placeholder: string;
}>;
export default _sfc_main;
