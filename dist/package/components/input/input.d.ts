export declare const inputProps: {
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
};
export declare const inputEmits: {
    change: (newVal: string | number, oldVal: string | number) => boolean;
    blur: (e: FocusEvent) => boolean;
    input: (val: string | number) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string | number) => boolean;
};
