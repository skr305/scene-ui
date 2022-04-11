import {App, VNode} from 'vue'

/**
 * loading 组件的props类型
 */
export type loadingProps = {
    target: VNode | string | HTMLElement //  Loading需要覆盖的 DOM 节点.可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入document.querySelector以获取到对应DOM节点
    fullScreen: boolean     // 是否占据整个屏幕
    text: string            // loading组件的文本提示
    onClose: Function       // loading组件关闭的回调函数
}

/**
 * loading组件的内置data类型
 */
export type loadingData = {
    target: VNode | string | HTMLElement 
    fullScreen: boolean 
    text: string            
    onClose: Function       
    loadingVM: App<Element>
    loadingMountElement: HTMLElement
    visible: boolean            // loading组件的可见性
    originalPosition: string,   // target原始的css position值
    originalOverflow: string    // target原始的css overflow值
}

