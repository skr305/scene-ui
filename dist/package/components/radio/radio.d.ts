export declare const radioProps: {
    modelValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
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
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
};
export declare const radioEmits: {
    change: (val: string | number | boolean) => boolean;
};
