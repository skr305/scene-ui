import AppResponse from '../../../core/lib/app-response';
export interface ChatProps {
    sendMes ?: ( chatID: string, content: string ) => Promise< AppResponse< { done: boolean } > >;
    recieveMes ?: ( chatID: string ) => Promise< AppResponse< { content: string, isMe: boolean } > >;
    
    myNick ?: string;
    yourNick ?: string;
    // need base property
    chatID: string;
};