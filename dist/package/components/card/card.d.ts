export declare const cardProps: {
    header: {
        type: StringConstructor;
    };
    shadow: {
        type: StringConstructor;
        default: string;
        validator(val: string): boolean;
    };
    bodyStyle: {
        type: ObjectConstructor;
    };
};
