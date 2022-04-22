export declare const iconProps: {
    name: {
        type: StringConstructor;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        validate(value: string | number): boolean;
    };
    color: {
        type: StringConstructor;
    };
};
