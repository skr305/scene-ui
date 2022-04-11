declare const _default: import("vue").DefineComponent<{
    width: {
        type: NumberConstructor;
        /** 根据不同的浏览器计算滚动条的厚度 */
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
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
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
            backgroundColor: string;
        };
        y: {
            padding: string;
            width: string;
            height: string;
            top: string;
            right: string;
            transform: string;
            borderRadius: string;
            backgroundColor: string;
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
        /** 根据不同的浏览器计算滚动条的厚度 */
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
        validator(value: import("../../core/constants/comp").StandardColor): boolean;
    };
    clickUpdateDelay: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    theme: string;
    thumbSize: number;
    clickUpdateDelay: number;
}>;
export default _default;
