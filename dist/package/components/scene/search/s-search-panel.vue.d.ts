declare const _sfc_main: import("vue").DefineComponent<{
    onSearch: {
        type: FunctionConstructor;
        required: true;
    };
    searchSubmitTitle: {
        type: StringConstructor;
        required: false;
    };
    searchPlaceholder: {
        type: StringConstructor;
        required: false;
    };
}, {
    props: {
        onSearch: (key: string) => any;
        searchSubmitTitle?: string | undefined;
        searchPlaceholder?: string | undefined;
    };
    key: import("vue").Ref<string>;
    search: () => void;
    sInput: import("vue").DefineComponent<{
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
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
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
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        validate: {
            type: FunctionConstructor;
            default: undefined;
        };
    }>> & {
        onChange?: ((newVal: string | number, oldVal: string | number) => any) | undefined;
        "onUpdate:modelValue"?: ((val: string | number) => any) | undefined;
        onBlur?: ((e: FocusEvent) => any) | undefined;
        onFocus?: ((e: FocusEvent) => any) | undefined;
        onInput?: ((val: string | number) => any) | undefined;
    }, {
        type: string;
        disabled: boolean;
        width: number;
        validate: Function;
        placeholder: string;
        readonly: boolean;
        clearable: boolean;
        center: boolean;
    }>;
    sButton: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
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
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
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
    Search: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    onSearch: {
        type: FunctionConstructor;
        required: true;
    };
    searchSubmitTitle: {
        type: StringConstructor;
        required: false;
    };
    searchPlaceholder: {
        type: StringConstructor;
        required: false;
    };
}>>, {}>;
export default _sfc_main;
