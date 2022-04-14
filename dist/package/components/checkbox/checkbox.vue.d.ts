declare const _default: import("vue").DefineComponent<{
    checked: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
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
        validator(value: import("../../core/constants/comp").StandardSize): boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
}, {
    current: import("vue").Ref<boolean>;
    checkboxClass: import("vue").ComputedRef<"checkbox-scene-disabled" | "checkbox-scene-checked" | "checkbox-scene-unchecked">;
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
    onChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: typeof import("../../core/lib/type-assert").isBoolean;
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
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
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
        validator(value: import("../../core/constants/comp").StandardSize): boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
}>> & {
    onChange?: ((value: any) => any) | undefined;
}, {
    theme: string;
    size: string;
    disabled: boolean;
    checked: boolean;
    modelValue: boolean;
    label: string;
    unsure: boolean;
}>;
export default _default;
