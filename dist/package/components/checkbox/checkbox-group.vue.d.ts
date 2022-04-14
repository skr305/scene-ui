declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        default: boolean;
        required: boolean;
        validator(value: any[]): boolean;
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: any[]) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: boolean;
        required: boolean;
        validator(value: any[]): boolean;
    };
}>> & {
    onChange?: ((value: any[]) => any) | undefined;
}, {
    modelValue: unknown[];
}>;
export default _default;
