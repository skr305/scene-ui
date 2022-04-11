import { ComponentConstants } from '../../core/constants';
export declare const buttonProps: {
    type: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: StringConstructor;
        default: string;
        validator(value: string): boolean;
    };
};
export declare const buttonEmits: {
    click: (evt: MouseEvent) => boolean;
};
