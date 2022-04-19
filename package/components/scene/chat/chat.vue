<template>
    <div className="__scene-chat-wrp">
        <s-card class="__scene-chat" :style="{ overflowX: 'hidden' }">
            <div className="__scene-chat-inner-wrp" >
                <s-scrollbar :alwaysNeedY="true" :width="480" :height="400"
                ref="scrollRef">
                    <div className="__scene-chat-records"
                    ref="recordsRef">
                        <div 
                        v-for="( r, i ) in messageRecords"
                        :key=" '__record-no.' + i "
                        className="__scene-mes-wrp"
                        > 
                            <div 
                            :class="[ r.isMe ? '__scene-chat-me' : '__scene-chat-you', '__scene-chat-mes' ]">
                                <s-paper :label="r.content"></s-paper>
                            </div>
                            
                        </div>
                        
                    </div>
                </s-scrollbar>
                <div className="__scene-chat-sender">
                    <s-input v-model="inputed" :width="350"
                    placeholder="input something" 
                    ref="inputRef"></s-input>
                    <div className="__scene-chat-submit-wrp">
                        <s-button class="__scene-chat-submit" @click="onSend"> send </s-button>
                    </div> 
                </div>
            </div>
            
        </s-card>
    </div>
</template>
<script setup lang="ts">
import sButton from '../../button/button.vue';
import SCard  from '../../card/card.vue';
import SPaper from '../../paper/s-paper.vue';
import SInput from '../../input/input.vue';
import SScrollbar from '../../scrollbar/scrollbar.vue';
import { ref, onUnmounted, nextTick } from 'vue';

export interface ChatProps {
    chatID: string,
    send : ( p:{ chatID: string, message: string } ) => Promise< { done: boolean } >
    receive ?: ( p: { chatID: string } ) => Promise< ChatMessage[] >

    // default is false
    // update your send-message when server notify you send-done
    updateAfterSendDone ?: boolean;
};
export type ChatMessage = {
    isMe ?: boolean;
    content: string;
};
const props = withDefaults(defineProps<ChatProps>(), {});

const DEFAULT_ASK_TIME_DURATION = 3000;
const messageRecords = ref< Array< ChatMessage > >( [] );
const inputed = ref( "" );

const scrollRef = ref(null);
const recordsRef = ref(null);
const inputRef = ref( null );

let receiver = null;
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
        

        // const distance = recordsRef.
        // // 滑倒最底下
        nextTick( () => {
            scrollRef.value.moveTo ( recordsRef.value.clientHeight + 61 , 'Y' );
        } )
        // clear
        inputed.value = "23";
        inputRef.value.updateValue( null, "" );
        // // this logic always make sense
        // nextTick( () => {
        //    inputRef.value.$el.querySelector( "input" ).value = ""
        // } );
        
    } catch( error ) {
        console.warn( ` something error in send message
        ...:scene-ui@0.2.0/chat ` );
    }
};
if( props.receive ) {
        receiver = setInterval( async () => {
        try {
            ( await props.receive( { chatID: props.chatID } ) )
            .map( m => {
                const { content, isMe } = m;
                /** the message recieved is from your friend in Default */
                messageRecords.value.push( { content, isMe: isMe || false } );
            } );
            
        } catch( error ) {
            console.warn( ` something error in recieve message
            ...:scene-ui@0.2.0/chat ` );
        }
        
    }, DEFAULT_ASK_TIME_DURATION );
}

onUnmounted(() => {
    if( receiver !== null ) {
        clearInterval( receiver );
    }
});
</script>
<style>
.__scene-chat-wrp {
    margin: 1em auto;
    /* min-height: 100px; */
}
.__scene-inner-wrp {
}
.__scene-chat-sender {
    border: solid 3px black;
    margin: 1em auto;
    padding: 1em 2em;

    text-align: center;

}
.__scene-chat-submit-wrp {
    margin: 1em auto;
}
.__scene-mes-wrp {
    float: none;
    /* display: inline-block; */
     overflow: hidden;
    padding: .4em;
    
}
.__scene-chat-mes {
    margin: .5em .2em;
   
}
.__scene-chat-records {
    /* height: 400px; */
    /* min-height: 300px; */

    width: 480px;

    margin: 0 auto;


    /* padding: 1em 1.5em; */
    box-sizing: border-box;

}

.__scene-chat-me {
    float: right;
}
.__scene-chat-you {
    float: left;
}
.__scene-chat-submit {
    font-size: 1.4em;
    padding: 0.7em 3em !important;
}
</style>