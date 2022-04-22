export declare type SceneMessageStyleType = "info" | "success" | "error" | "warning";
export interface MessageInvokeParams {
    type?: SceneMessageStyleType;
    duration?: number;
    text?: string;
    showCloseButton?: boolean;
}
declare const message: (params: MessageInvokeParams) => void;
export default message;
