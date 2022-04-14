import { ComponentConstants } from '../../core/constants';
export declare const selectProps: {
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    modelValue: {
        type: (StringConstructor | BooleanConstructor | ArrayConstructor | NumberConstructor)[];
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
};
export declare const selectEmits: {
    change: (val: string) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: string | string[]) => boolean;
};
