export declare const textareaProps: {
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
};
export declare const textareaEmits: {
    change: (newVal: string, oldVal: string) => boolean;
    blur: (e: FocusEvent) => boolean;
    input: (val: string) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string) => boolean;
};
