import { ComponentConstants } from '../../core/constants';
export declare const numberInputProps: {
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
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
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
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
