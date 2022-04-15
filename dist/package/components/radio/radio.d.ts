import { ComponentConstants } from '../../core/constants';
export declare const radioProps: {
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
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
    border: {
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
