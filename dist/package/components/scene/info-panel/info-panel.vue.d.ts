import { ComponentConstants } from '../../../core/constants';
declare const _sfc_main: import("vue").DefineComponent<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
        validate(value: string | number): boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        validate(value: string | number): boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    title: {
        type: StringConstructor;
    };
    info: {
        type: ObjectConstructor;
        default: {};
    };
}, {
    themeColor: import("vue").ComputedRef<string | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: (StringConstructor | NumberConstructor)[];
        validate(value: string | number): boolean;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        validate(value: string | number): boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    title: {
        type: StringConstructor;
    };
    info: {
        type: ObjectConstructor;
        default: {};
    };
}>>, {
    type: string;
    info: Record<string, any>;
    theme: string;
}>;
export default _sfc_main;
