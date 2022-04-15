import { ComponentConstants } from '../../core/constants';
export interface PaymentInputProps {
    theme?: ComponentConstants.StandardColor;
    disabled?: boolean;
    modelValue?: string;
    numberOnly?: boolean;
    onFill?: (pwd: string) => any;
}
export declare type PaymentInputSets = [string, string, string, string, string, string];
declare const _sfc_main: import("vue").DefineComponent<{
    theme: {
        type: null;
        required: false;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    numberOnly: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    onFill: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: {
        theme: ComponentConstants.StandardColor;
        disabled: boolean;
        modelValue: string;
        numberOnly: boolean;
        onFill?: ((pwd: string) => any) | undefined;
    };
    data: {
        inIdx: number;
    };
    pwdSets: [string, string, string, string, string, string];
    emit: (event: "update:modelValue", value: string) => void;
    onPut: () => void;
    onDropPwdCell: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => string;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: null;
        required: false;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    numberOnly: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    onFill: {
        type: FunctionConstructor;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}, {
    theme: any;
    disabled: boolean;
    modelValue: string;
    numberOnly: boolean;
}>;
export default _sfc_main;
