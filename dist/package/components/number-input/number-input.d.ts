export declare const numberInputProps: {
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
};
export declare const numberInputEmits: {
    change: (cur: number, prev: number) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    input: (val: number) => boolean;
    'update:modelValue': (val: number | undefined) => boolean;
};
