import {computed, defineComponent, inject, onMounted, ref} from "vue";
import './editor.scss'
import EditorBlock from './editor-block'
import Attribute from './attr-block'
import deepcopy from "deepcopy";
import {useMenuDragger} from "@/packages/useMenuDragger";
import {useFocus} from "@/packages/useFocus";
import {left} from "core-js/internals/array-reduce";
import {useBlockDragger} from "@/packages/useBlockDragger";
import {useCommand} from "@/packages/useCommand";
import {useAttribute} from "@/packages/useAttribute";
import Grid from "../utils/Grid"

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components:{
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
        let {blockMousedown, focusData, containerMousedown, lastSelectBlock} = useFocus(data, (e) => {
            mousedown(e)
            // console.log(JSON.stringify(attrs_style.value.attribute))
            // console.log(JSON.stringify(attrs_style.value.block))
        });


        // 实现组件拖拽功能
        let {mousedown, markLine} = useBlockDragger(focusData, lastSelectBlock);


        const {commands} = useCommand(data);
        const buttons = [
            {label: '撤销', handler: () => commands.undo()},
            {label: '重做', handler: () => commands.redo()},
            // todo 这里有一个bug，（删除两个 -> 撤销两个 -> 重做两次） 就可以看到
            {label: '删除', handler: () => commands.remo()},
            {label: '置顶',},
            {label: '置底',},
            {label: '导出', handler: () => commands.outPut()},
            {label: '导入',},
            {label: '预览',},
            {label: '清空',},
            {label: '锁定',},
            {label: '解锁',},
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
                    return <div class="editor-top-button" onClick={btn.handler}>
                        <span class={btn.label}>{btn.label}</span>
                    </div>
                })}
            </div>
            <div class="editor-right">
                {/*产生滚动条*/}
                <div class="editor-right-form">
                    {/*产生组件属性表单*/}
                    <Attribute v-model={data.value}></Attribute>
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
                        onMousedown={containerMousedown}
                    >
                        {/*网格线*/}
                        <Grid />
                        {
                            (data.value.blocks.map((block, index) => (
                                <EditorBlock
                                    class={block.focus ? 'editor-block-focus' : ''}
                                    block={block}
                                    data={data}
                                    onMousedown={(e) => blockMousedown(e, block, index)}
                                ></EditorBlock>
                            )))
                        }
                        {markLine.x !== null && <div class='line-x' style={{left: markLine.x + 'px'}}></div>}
                        {markLine.y !== null && <div class='line-y' style={{top: markLine.y + 'px'}}></div>}

                    </div>
                </div>
            </div>
        </div>
    }
})