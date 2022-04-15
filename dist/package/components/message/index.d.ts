export declare type SceneMessageStyleType = "info" | "suc" | "error" | "warn";
export interface MessageInvokeParams {
    type?: SceneMessageStyleType;
    duration?: number;
    text?: string;
    showCloseButton?: boolean;
}
declare const message: (params: MessageInvokeParams) => void;
export default message;
