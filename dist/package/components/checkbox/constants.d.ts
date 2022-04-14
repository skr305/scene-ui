export declare const CHECK_GROUP_CONTEXT = "checkbox-group";
export declare type CheckGroupContextType = {
    groupLabels: string[];
    labelChange: (val: string[]) => any;
    pushToDeps: (handler: (labels: string[]) => any) => any;
};
