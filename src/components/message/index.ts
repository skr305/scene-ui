import { createApp } from "vue";
import Message from './message.vue'
export type SceneMessageStyleType = "info" | "suc" | "error" | "warn";
export interface MessageInvokeParams {
    type ?: SceneMessageStyleType;
    duration ?: number;
    text ?: string;
    showCloseButton ?: boolean;
};
const message = ( params: MessageInvokeParams ) => {
    const {
        type = "info",
        duration = 3000,
        text = "Tip", 
        showCloseButton = false
    } = params;

    createInstance( { type, duration, text, showCloseButton } );

};
export default message;
const createInstance = ( params: MessageInvokeParams ) => {
  
    // 创建包裹容器，并设置外层的 Class 属性
    let messageNode = document.createElement('div');
    let attr = document.createAttribute("class");
    attr.value = "sc-message";
    messageNode.setAttributeNode(attr);
  
    // 消息计数：用于多个消息打开的时候，通过设置 Top 使各组件错开
    const height = 54; // 高度值
    const messageList:HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName('sc-message') as HTMLCollectionOf<HTMLDivElement>;
    messageNode.style.position = "fixed";
    messageNode.style.top = `${messageList.length * height}px`;

  
    /**
     * 重新设置各个 Msg 距离顶部的 Top 值
     */
    const resetMsgTop = () => {
      for (let i = 0; i < messageList.length; i++) {
        messageList[i].style.top = `${i * height}px`
      }
    }
  
    const onClose = ()=>{
      app.unmount();
      document.body.removeChild(messageNode);
      resetMsgTop();
    }
  
    // 创建 Vue 实例并挂载到 Body
    const app = createApp(Message, {
      ...params,
      onClose
    })
  
    // 挂载实例并追加到 Body 结尾
    app.mount(messageNode);
    document.body.appendChild(messageNode);
  
    return app;
};
  
