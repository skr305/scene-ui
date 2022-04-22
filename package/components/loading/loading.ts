import {
    createApp,
    h,
    reactive,
    Transition,
    vShow,
    withDirectives,
    App,
    isProxy,
    VNodeChild,
    VNode,
  } from 'vue'
import { loadingProps, loadingData } from "./type";
import './loading.css'

// 单例模式
let loadingInstance = null;
// 默认的loading组件的props
const defaultLoadingProps: loadingProps = {
    target: 'body',
    fullScreen: true,
    text: 'loading...',
    onClose: ()=>{
        console.log('loading close!');
    }
}

/**
 * 创建一个loading服务
 * @param options loading的Props
 * @returns 返回一个loading组件实例
 */
function service(options: loadingProps = defaultLoadingProps){
    // 单例模式
    if(loadingInstance === null)
        loadingInstance = createLoadingComponent(options);
    
    return loadingInstance
}

/**
 * 创建一个loading组件实例
 * @param options loading的Props
 * @returns 返回一个有完整生命周期的loading组件实例
 */
function createLoadingComponent(options: loadingProps = defaultLoadingProps){
    const data = reactive<loadingData>({
        ...options,
        loadingVM: null,            // loading 组件的vm实例
        loadingMountElement: null,  // loading 组件vm实例挂载的div，是target的child
        visible: false,             // loading 组件的可见性
        originalPosition: '',
        originalOverflow: ''
    })

    
    // loading组件的初始化
    async function init(){
        // 防止创建多个loading组件
        if(data.loadingMountElement === null && data.loadingVM === null){
            data.loadingVM = createApp(sceneLoadingComponent)
            // 包裹loading组件vm实例的DOM节点
            data.loadingMountElement = document.createElement('div')
            // 设置loading最外层div的样式
            data.loadingMountElement.style.position = "absolute";
            data.loadingMountElement.style.top = '0px'
            data.loadingMountElement.style.left = '0px'
            data.loadingMountElement.style.padding = '0'
            data.loadingMountElement.style.width = '100%'
            data.loadingMountElement.style.height = '100%'
            // 挂载实例到最外层div上
            data.loadingVM.mount(data.loadingMountElement)

            
            // 添加最外层div到target上
            if(typeof data.target === 'object'){
                let parent = data.target as VNode
                // 关闭滚轮的默认行为——页面锁定
                parent.el.addEventListener("wheel", preventDefaultFunc, {passive:false});
                // 保存target的position值与overflow值
                data.originalPosition = parent.el.style.position
                data.originalOverflow = parent.el.style.overflow

                parent.el.style.position = 'relative'   // 设置为absolute布局的子元素的相对元素
                parent.el.style.overflow = 'hidden'
                parent.el.appendChild(data.loadingMountElement)
            }
            else{
                let parent: HTMLElement = document.querySelector(data.target as string)
                // 关闭滚轮的默认行为——页面锁定
                parent.addEventListener("wheel", preventDefaultFunc, {passive:false});
                console.log(parent,document.body, data.fullScreen, parent === document.body);
                // 如果是全屏loading
                if(document.body === parent && data.fullScreen){
                    
                    // 保存target的position值与overflow值
                    data.originalPosition = parent.style.position
                    data.originalOverflow = parent.style.overflow
                    // 设置body的样式
                    // document.body.scrollTop与document.documentElement.scrollTop同时只会有一个值生效。
                    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
                    let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
                    data.loadingMountElement.style.top = `${scrollTop - parseInt(document.body.style.marginTop || "0")}px`
                    // data.loadingMountElement.style.left = `${scrollLeft - parseInt(document.body.style.marginLeft)}px`
                    data.loadingMountElement.style.top = `${scrollTop}px`
                    data.loadingMountElement.style.left = `${scrollLeft}px`
                    
                    data.loadingMountElement.style.width = '100vw'
                    data.loadingMountElement.style.height = '100vh'
                    console.warn(data.loadingMountElement.style.top,data.loadingMountElement.style.left);
                }
                parent.style.overflow = 'hidden'
                parent.style.position = 'relative'      // 设置为absolute布局的子元素的相对元素
                parent.appendChild(data.loadingMountElement);
            }
        }
    }

    // loading组件的销毁
    function destroy(){
        // 防止创建多个loading组件
        if(data.loadingMountElement !== null && data.loadingVM !== null){
            // vue app销毁
            data.loadingVM.unmount()
            // div从target上移除
            if(typeof data.target === 'object'){
                let parent = data.target as VNode
                parent.el.removeEventListener("wheel", preventDefaultFunc);
                // 恢复target的position与overflow值
                parent.el.style.position = data.originalPosition
                parent.el.style.overflow = data.originalOverflow
                parent.el.removeChild(data.loadingMountElement) // 从target上移除loading组件的div
            }
            else{
                let parent: HTMLElement = document.querySelector(data.target as string)
                parent.removeEventListener("wheel", preventDefaultFunc);
                // 恢复target的position与overflow值
                parent.style.position = data.originalPosition
                parent.style.overflow = data.originalOverflow
                parent.removeChild(data.loadingMountElement);   // 从target上移除loading组件的div
            }
            // 销毁data上的loadingVM与loadingMountElement
            data.loadingVM = null
            data.loadingMountElement = null
        }
        // 销毁单例loading组件实例
        loadingInstance = null
    }

    //阻止默认事件进行的函数
    function preventDefaultFunc(e: Event) { e.preventDefault();}

    // 打开loading组件
    function open(){
        init()
        data.visible = true
    }

    // 关闭loading组件
    function close(){
        data.visible = false
        destroy()
        data.onClose()// 触发props的onclose事件
    }

    const sceneLoadingComponent = {
        name: 'scene-loading',
        setup(){
            const spinner = h('div',{class: 'loading'},[h('div'),h('div')])
            const spinnerText = data.text? h(
                'p', 
                { 
                    class: 'scene-loading-text',
                    style:{
                        cursor: 'pointer'
                    }
                }, 
                [data.text]
            ): undefined

            return () =>{
                return h(
                    Transition, // 使用渲染函数渲染<Transition>时，不能用string而是需要导入内置的Transition
                    {
                        name: 'scene-loading',
                    },
                    ()=>[ // 在render函数中使用默认指令 withDirectives
                        withDirectives(
                            h(
                                'div',
                                {
                                    class: ['scene-loading-mask'],
                                    style: { 
                                        background: 'rgba(255, 255, 255, .9)',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: '10000',
                                        color: '#9000ff',
                                    }
                                },
                                [spinner,spinnerText]
                            ),
                        [[vShow, data.visible]]
                        )
                    ]
                )
            }
        }
    }
    
    return {
        open,
        close,
    }
    
}

export const SceneLoading = {
    service
}