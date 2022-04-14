declare const _default: import("vue").DefineComponent<{
    header: {
        type: StringConstructor;
    };
    shadow: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    bodyStyle: {
        type: ObjectConstructor;
    };
}, {
    el: import("vue").Ref<HTMLElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    header: {
        type: StringConstructor;
    };
    shadow: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    bodyStyle: {
        type: ObjectConstructor;
    };
}>>, {
    shadow: string;
}>;
export default _default;
