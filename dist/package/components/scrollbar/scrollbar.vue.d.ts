declare const _sfc_main: import("vue").DefineComponent<{
    width: {
        type: NumberConstructor;
        required: boolean;
    };
    height: {
        type: NumberConstructor;
        required: boolean;
    };
    thumbSize: {
        type: NumberConstructor;
        default: number;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    alwaysNeedY: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    alwaysNeedX: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    clickUpdateDelay: {
        type: NumberConstructor;
        default: number;
    };
}, {
    el: import("vue").Ref<HTMLElement | undefined>;
    wrap: import("vue").Ref<HTMLElement | undefined>;
    thumbX: import("vue").Ref<HTMLElement | undefined>;
    thumbY: import("vue").Ref<HTMLElement | undefined>;
    wrapStyle: {
        width: string;
        height: string;
    };
    thumbStyle: {
        x: {
            padding: string;
            width: string;
            height: string;
            left: string;
            bottom: string;
            transform: string;
            borderRadius: string;
            backgroundColor: string | undefined;
        };
        y: {
            padding: string;
            width: string;
            height: string;
            top: string;
            right: string;
            transform: string;
            borderRadius: string;
            backgroundColor: string | undefined;
        };
    };
    showThumb: {
        x: boolean;
        y: boolean;
    };
    updateThumbStyle: () => void;
    onEnter: () => void;
    onLeave: () => void;
    moveTo: (distance: number, direction: 'Y' | 'X') => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: NumberConstructor;
        required: boolean;
    };
    height: {
        type: NumberConstructor;
        required: boolean;
    };
    thumbSize: {
        type: NumberConstructor;
        default: number;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
    alwaysNeedY: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    alwaysNeedX: {
        type: BooleanConstructor;
        default: boolean;
        required: boolean;
    };
    clickUpdateDelay: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    theme: string;
    thumbSize: number;
    alwaysNeedY: boolean;
    alwaysNeedX: boolean;
    clickUpdateDelay: number;
}>;
export default _sfc_main;
