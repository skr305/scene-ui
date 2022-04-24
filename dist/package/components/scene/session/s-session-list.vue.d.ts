declare const _sfc_main: import("vue").DefineComponent<{
    metas: {
        type: ArrayConstructor;
        required: true;
    };
    onTouch: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: {
        metas: {
            id: string;
            title: string;
            avatar?: string | null | undefined;
        }[];
        onTouch?: ((id: string) => any) | undefined;
    };
    SSession: import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    metas: {
        type: ArrayConstructor;
        required: true;
    };
    onTouch: {
        type: FunctionConstructor;
        required: false;
    };
}>>, {}>;
export default _sfc_main;
