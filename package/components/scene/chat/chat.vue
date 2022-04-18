<template>
    <s-card class="__scene-chat">
        <div className="__scene-chat-records">
            <div 
            v-for="( r, i ) in messageRecords"
            :key=" '__record-no.' + i "
            :class="[ r.isMe ? '__scene-chat-me' : '__scene-chat-you' ]"
            > 
                {{ r.content }}
            </div>
        </div>
        <div class="__scene-chat-sender">
            <s-textarea class="__scene-chat-send-input" v-model="inputed" ></s-textarea>
            <s-button class="__scene-chat-send-button" @click="onSend"> send </s-button>
        </div>
    </s-card>
</template>
<script lang="ts">
import sTextarea from '../../textarea/textarea.vue';
import sButton from '../../button/button.vue';
import SCard  from '../../card/card.vue';
import { defineComponent, reactive, ref } from 'vue';
import { ChatProps, ChatBindings ,ChatMessage } from './chat';

export default defineComponent<ChatProps, ChatBindings>( {
    name: "s-chat",
    setup ( props:ChatProps, ctx ) {
        const DEFAULT_ASK_TIME_DURATION = 3000;
        const messageRecords = ref< Array< ChatMessage > >( [] );
        const inputed = ref( "" );
        const onSend = async () => {
            try {
                const message = { chatID: props.chatID, message: inputed.value };
                if( props.updateAfterSendDone !== undefined ) {
                    await props.send( message );
                    messageRecords.value.push( { isMe: true, content: inputed.value } );
                } else {
                    messageRecords.value.push( { isMe: true, content: inputed.value } );
                    await props.send( message );
                }
            } catch( error ) {
                console.warn( ` something error in send message
                ...:scene-ui@0.2.0/chat ` );
            }
        };
        if( props.recieve ) {
             setTimeout( async () => {
                try {
                    const content = (await props.recieve( { chatID: props.chatID } )).message;
                    /** the message recieved is from your friend in Default */
                    messageRecords.value.push( { content, isMe: false } );
                } catch( error ) {
                    console.warn( ` something error in recieve message
                    ...:scene-ui@0.2.0/chat ` );
                }
                
            }, DEFAULT_ASK_TIME_DURATION );
        }
       
        return {
            messageRecords,
            inputed,
            onSend
        };
    }
} );
</script>