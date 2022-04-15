export declare const checkBoxGroupProps: {
    modelValue: {
        type: ArrayConstructor;
        default: boolean;
        required: boolean;
        validator(value: Array<any>): boolean;
    };
};
export declare const checkBoxGroupEmits: {
    change: (value: Array<any>) => boolean;
};
