import { ComponentConstants } from "../../core/constants";
import { isBoolean } from "../../core/lib/type-assert";
export declare const checkBoxBtnProps: {
    checked: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: ComponentConstants.StandardSize): boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    leftBorderRound: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    rightBorderRound: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
};
export declare const checkBoxBtnEmits: {
    change: typeof isBoolean;
    "update:modelValue": typeof isBoolean;
};
