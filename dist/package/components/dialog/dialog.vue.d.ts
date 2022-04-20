declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: boolean;
    };
    title: {
        type: StringConstructor;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    mask: import("vue").Ref<HTMLElement | undefined>;
    container: import("vue").Ref<HTMLElement | undefined>;
    closeDialog: (isTrigger: boolean) => void;
    onBeforeEnter: () => void;
    onBeforeLeave: () => void;
    onAfterEnter: () => void;
    onAfterLeave: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: boolean;
    };
    title: {
        type: StringConstructor;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    [x: string & `on${string}`]: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    width: number;
    modal: boolean;
    lockScroll: boolean;
    closeOnClickModal: boolean;
}>;
export default _sfc_main;
