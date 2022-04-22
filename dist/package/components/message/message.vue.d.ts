declare const _sfc_main: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: boolean;
    };
    duration: {
        type: NumberConstructor;
        required: boolean;
    };
    text: {
        type: StringConstructor;
        required: boolean;
    };
    showCloseButton: {
        type: BooleanConstructor;
        required: boolean;
    };
    onClose: {
        type: FunctionConstructor;
        required: boolean;
    };
}, {
    onOpen: () => void;
    onClose: () => void;
    contentClass: import("vue").ComputedRef<string>;
    visibled: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: boolean;
    };
    duration: {
        type: NumberConstructor;
        required: boolean;
    };
    text: {
        type: StringConstructor;
        required: boolean;
    };
    showCloseButton: {
        type: BooleanConstructor;
        required: boolean;
    };
    onClose: {
        type: FunctionConstructor;
        required: boolean;
    };
}>>, {
    showCloseButton: boolean;
}>;
export default _sfc_main;
