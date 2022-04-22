declare const _sfc_main: import("vue").DefineComponent<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    unsure: {
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
        validator(value: import("../../core/constants/constants").StandardSize): boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
}, {
    current: import("vue").Ref<boolean>;
    checkboxClass: import("vue").ComputedRef<string>;
    SizeMap: {
        large: string;
        default: string;
        small: string;
    };
    FontSizeMap: {
        large: string;
        default: string;
        small: string;
    };
    checkboxSign: import("vue").ComputedRef<"" | "✳️" | "✅">;
    themeBorderColor: import("vue").ComputedRef<string | undefined>;
    onChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: typeof import("../../core/lib/type-assert").isBoolean;
    "update:modelValue": typeof import("../../core/lib/type-assert").isBoolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    unsure: {
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
        validator(value: import("../../core/constants/constants").StandardSize): boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
}>> & {
    onChange?: ((value: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}, {
    theme: string;
    size: string;
    disabled: boolean;
    checked: boolean;
    modelValue: boolean;
    label: string;
    unsure: boolean;
}>;
export default _sfc_main;
