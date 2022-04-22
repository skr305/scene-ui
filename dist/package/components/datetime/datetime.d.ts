import { ComponentConstants } from "../../core/constants";
export declare const datetimeProps: {
    modelValue: {
        type: DateConstructor;
        required: boolean;
        default: Date;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
};
export declare const datetimeEmits: {
    change: (newVal: Date, oldVal: Date) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: Date) => boolean;
};
