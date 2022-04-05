import { WritableComputedRef } from "vue";

export const CHECK_GROUP_CONTEXT = "checkbox-group";
export type CheckGroupContextType = {
    groupLabels: string[];
    labelChange: ( val: string[] ) => any
}