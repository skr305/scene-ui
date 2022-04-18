import { Ref } from "vue";
export interface ChatProps {
    chatID: string,
    send : ( p:{ chatID: string, message: string } ) => Promise< { done: boolean } >
    recieve ?: ( p: { chatID: string } ) => Promise< { message: string } >

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
    // default: true
    isMe ?: boolean;
    content: string;
};