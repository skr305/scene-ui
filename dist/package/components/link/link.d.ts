import { ComponentConstants } from '../../core/constants';
export declare const linkProps: {
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
};
export declare const linkEmits: {
    click: (evt: MouseEvent) => boolean;
};
