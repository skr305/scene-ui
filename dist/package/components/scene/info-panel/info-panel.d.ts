import { ComponentConstants } from '../../../core/constants';
export declare const infoPanelProps: {
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
    };
    title: {
        type: StringConstructor;
    };
    info: {
        type: ObjectConstructor;
        default: {};
    };
};
