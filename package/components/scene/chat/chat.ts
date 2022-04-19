import { Ref } from "vue";
export interface ChatProps {
    chatID: string,
    send : ( p:{ chatID: string, message: string } ) => Promise< { done: boolean } >
    receive ?: ( p: { chatID: string } ) => Promise< ChatMessage >

    // default is false
    // update your send-message when server notify you send-done
    updateAfterSendDone ?: boolean;
};
export interface ChatBindings {
    messageRecords: Ref< Array< ChatMessage > >;
    inputed: Ref< string >;
    onSend: () => Promise<any>;
};
export type ChatMessage = {
    isMe ?: boolean;
    content: string;
};