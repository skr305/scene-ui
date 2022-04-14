import { ComponentConstants } from '../../core/constants';
declare const _default: import("vue").DefineComponent<{
    href: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    handleClick: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    href: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    theme: string;
    disabled: boolean;
    href: string;
    underline: boolean;
}>;
export default _default;
