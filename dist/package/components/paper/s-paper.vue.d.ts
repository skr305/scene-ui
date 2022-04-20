import { StandardColor, StandardSize } from '../../core/constants/constants';
export interface SPaperProps {
    theme?: StandardColor;
    size?: StandardSize;
    label?: string;
    needRadius?: boolean;
}
declare const _sfc_main: import("vue").DefineComponent<{
    theme: {
        type: null;
        required: false;
        default: string;
    };
    size: {
        type: null;
        required: false;
        default: string;
    };
    label: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    needRadius: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: {
        theme: StandardColor;
        size: StandardSize;
        label: string;
        needRadius: boolean;
    };
    paperStyle: import("vue").ComputedRef<{
        fontSize: string;
        background: string | undefined;
        color: string;
        borderRadius: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: null;
        required: false;
        default: string;
    };
    size: {
        type: null;
        required: false;
        default: string;
    };
    label: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    needRadius: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    theme: any;
    size: any;
    label: string;
    needRadius: boolean;
}>;
export default _sfc_main;
