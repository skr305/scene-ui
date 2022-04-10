import {computed, defineComponent, inject, onMounted, reactive, ref} from "vue";
import './editor.scss'
import '../assets/iconfont/iconfont.scss'
import EditorBlock from './editor-block'
import Attribute from './attr-block'
import EventList from './event-block'
import previewDemo from "@/packages/previewDemo";
import deepcopy from "deepcopy";
import {useMenuDragger} from "@/packages/useMenuDragger";
import {useFocus} from "@/packages/useFocus";
import {left} from "core-js/internals/array-reduce";
import {useBlockDragger} from "@/packages/useBlockDragger";
import {useCommand} from "@/packages/useCommand";
import Grid from "../utils/Grid"
import {useRightClick} from "@/packages/useRightClick";
import RightClick from "@/packages/rightClick"
import {ElButton, ElTabPane, ElTabs} from 'element-plus'


export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        Grid,
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        // 设置计算属性，以便于实现数据的双向绑定
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })

        const state = {
            current: -1,
            queue: [],
            commands: {},
            commandArray: [],
            destroyArray: []
        }

        // 设置复制和剪切的内容容器，用来实现复制粘贴功能
        const copyContent = reactive({
            blockRightClickBox: false,
            containerRightClickBox: false,
            unlockRightClickBox: false,
            copyContent: [],
            startX: null,
            startY: null,
            data: data.value,
            state: state
        });
        // const copyContent = computed({
        //     get() {
        //         return copyContentReal.value
        //     },
        //     set(newValue) {
        //         ctx.emit('update:copyContent', deepcopy(newValue))
        //     }
        // })

        // 设置计算属性，用来改变和渲染画布的大小
        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px',
        }))

        const config = inject('config')

        // 实现菜单拖拽功能
        const containerRef = ref(null)
        const {dragstart, dragend} = useMenuDragger(containerRef, data);


        // 实现获取焦点
        let {blockMousedown, focusData, containerMousedown, lastSelectBlock} = useFocus(data, copyContent, (e) => {
            mousedown(e)
            // console.log(JSON.stringify(attrs_style.value.attribute))
            // console.log(JSON.stringify(attrs_style.value.block))
        });

        // 实现鼠标右键点击的操作
        let {containerRightClick, blockRightClick} = useRightClick(data, copyContent)

        // 实现组件拖拽功能
        let {mousedown, markLine} = useBlockDragger(focusData, lastSelectBlock);


        const {commands} = useCommand(data, state);
        const buttons = [
            {label: '撤销', handler: () => commands.undo()},
            {label: '重做', handler: () => commands.redo()},
            {label: '导出', handler: () => commands.output()},
            {label: '导入',},
            {label: '预览', handler: () => commands.preview()},
            {label: '清空', handler: () => commands.clear()},
            {label: '删除', handler: () => commands.remove()},
            {label: '置顶', handler: () => commands.top()},
            {label: '置底', handler: () => commands.bottom()},
            {label: '锁定', handler: () => commands.lock()},
            {label: '解锁', handler: () => commands.unlock()},
        ]

        return () => <div class="editor">
            <div class="editor-left">
                {/*根据注册列表  渲染对应的内容*/}
                {config.componentList.map(component => (
                    <div
                        class='editor-left-item'
                        draggable
                        onDragstart={e => dragstart(e, component)}
                        onDragend={dragend}
                    >
                        <span>{component.label}</span>
                        <div>{component.preview()}</div>
                    </div>
                ))}
            </div>

            <div class="editor-top">
                {buttons.map((btn, index) => {
                    // console.log(JSON.stringify(data.value))
                    let deleteDisabled = true
                    let topDisabled = true
                    let bottomDisabled = true
                    let lockDisabled = true
                    let unlockDisabled = true
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus === true && block.lock === false) {
                            deleteDisabled = false
                            topDisabled = false
                            bottomDisabled = false
                            lockDisabled = false
                        }
                        if (block.focus === true && block.lock === true) {
                            unlockDisabled = false
                        }
                    })
                    // console.log(index)
                    if (index === 6) {
                        // 删除
                        return <ElButton class="editor-top-button" disabled={deleteDisabled} onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    } else if (index === 7) {
                        return <ElButton class="editor-top-button" disabled={topDisabled} onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    } else if (index === 8) {
                        return <ElButton class="editor-top-button" disabled={bottomDisabled} onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    } else if (index === 9) {
                        return <ElButton class="editor-top-button" disabled={lockDisabled} onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    } else if (index === 10) {
                        return <ElButton class="editor-top-button" disabled={unlockDisabled} onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    } else {
                        return <ElButton class="editor-top-button" onClick={btn.handler}>
                            <span class={btn.label}>{btn.label}</span>
                        </ElButton>
                    }
                })}

            </div>
            <div class="editor-right">
                {/*产生滚动条*/}
                <div class="editor-right-form">
                    {/*产生组件属性表单*/}
                    <ElTabs class="editor-right-form-tabs" type="card">
                        <ElTabPane label="属性"><Attribute v-model={data.value}/></ElTabPane>
                        <ElTabPane label="事件"><EventList v-model={data.value}/></ElTabPane>
                        <ElTabPane label="XXX">XXX</ElTabPane>
                    </ElTabs>

                </div>
            </div>

            <div class="editor-container">
                {/*产生滚动条*/}
                <div class="editor-container-canvas">
                    {/*产生内容区域*/}
                    <div
                        class="editor-container-canvas_content"
                        style={containerStyles.value}
                        ref={containerRef}
                        onmousedown={containerMousedown}
                        oncontextmenu={containerRightClick}
                    >
                        <RightClick v-model={copyContent}/>
                        {/*网格线*/}
                        <Grid/>
                        <previewDemo v-model={data.value}/>


                        {
                            (data.value.blocks.map((block, index) => {
                                // console.log(index)
                                return <EditorBlock
                                    // class={"iconfont icon-suo"}
                                    // cursor="move"
                                    class={block.lock ? 'iconfont icon-suo' : ''}
                                    class={block.focus ? 'editor-block-focus' : ''}
                                    block={block}
                                    data={data}
                                    index={index}
                                    onmousedown={(e) => e.target.className === 'editor-block' || e.target.className === 'editor-block editor-block-focus' || e.target.className === 'editor-block iconfont icon-suo' ? blockMousedown(e, block, index) : ''}
                                    onmouseover={(e) => e.target.className === 'editor-block' || e.target.className === 'editor-block editor-block-focus' || e.target.className === 'editor-block iconfont icon-suo' ? e.target.style.cursor = block.moveSign : ''}
                                    // onmouseover={(e) => e.target.children.length === 0 ? '' : e.target.children[0].style.cursor ='move'}
                                    // onmouseover={(e) => console.log(e.target.className)}
                                    oncontextmenu={(e) => blockRightClick(e, block)}
                                />
                            }))
                        }
                        {markLine.x !== null && <div class='line-x' style={{left: markLine.x + 'px'}}/>}
                        {markLine.y !== null && <div class='line-y' style={{top: markLine.y + 'px'}}/>}

                    </div>
                </div>
            </div>
        </div>
    }
})
