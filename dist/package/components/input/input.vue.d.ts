declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    name: {
        type: StringConstructor;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    validate: {
        type: FunctionConstructor;
        default: undefined;
    };
}, {
    input: import("vue").Ref<HTMLInputElement | undefined>;
    tip: import("vue").Ref<HTMLElement | undefined>;
    updateValue: (event: InputEvent, newVal?: string | number | undefined) => void;
    showPassword: (e: Event, show: boolean) => void;
    handleFocus: (event: MouseEvent) => void;
    handleBlur: (event: MouseEvent) => void;
    focus: () => void;
    blur: () => void;
    inputValue: import("vue").Ref<string | number>;
    isEncrypt: import("vue").Ref<boolean>;
    inputType: import("vue").Ref<"text" | "password">;
    isFocus: import("vue").Ref<boolean>;
    isWarning: import("vue").Ref<boolean>;
    warningInfo: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (newVal: string | number, oldVal: string | number) => boolean;
    blur: (e: FocusEvent) => boolean;
    input: (val: string | number) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string | number) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    name: {
        type: StringConstructor;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    validate: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & {
    onChange?: ((newVal: string | number, oldVal: string | number) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string | number) => any) | undefined;
    onInput?: ((val: string | number) => any) | undefined;
}, {
    type: string;
    disabled: boolean;
    width: number;
    placeholder: string;
    clearable: boolean;
    validate: Function;
}>;
export default _default;
