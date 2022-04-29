declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | ArrayConstructor | NumberConstructor)[];
        required: boolean;
    };
    options: {
        type: ArrayConstructor;
        required: boolean;
        validator(value: string[]): boolean;
    };
    disabledOptions: {
        type: ArrayConstructor;
        default: never[];
        validator(value: boolean[]): boolean;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    multipleLimit: {
        type: NumberConstructor;
        default: number;
    };
    collapseTags: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    menu: import("vue").Ref<HTMLElement | undefined>;
    input: import("vue").Ref<HTMLInputElement | undefined>;
    selectedItems: import("vue").Ref<string[]>;
    showTags: import("vue").ComputedRef<boolean>;
    focus: () => void;
    blur: () => void;
    handleFocus: (event: MouseEvent) => void;
    handleBlur: (event: MouseEvent) => void;
    handleDelete: (e: Event) => void;
    handleSelect: (option: string, index: number, e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: string) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string | string[]) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (BooleanConstructor | StringConstructor | ArrayConstructor | NumberConstructor)[];
        required: boolean;
    };
    options: {
        type: ArrayConstructor;
        required: boolean;
        validator(value: string[]): boolean;
    };
    disabledOptions: {
        type: ArrayConstructor;
        default: never[];
        validator(value: boolean[]): boolean;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    multipleLimit: {
        type: NumberConstructor;
        default: number;
    };
    collapseTags: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((val: string) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string | string[]) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
}, {
    disabled: boolean;
    placeholder: string;
    multiple: boolean;
    disabledOptions: unknown[];
    multipleLimit: number;
    collapseTags: boolean;
}>;
export default _sfc_main;
