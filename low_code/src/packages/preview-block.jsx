import {computed, defineComponent, inject, onMounted, ref} from "vue";
import {buttonPreviewDraw} from "@/draw/buttonPreviewDraw";
import {textPreviewDraw} from "@/draw/textPreviewDraw"
import {inputPreviewDraw} from "@/draw/inputPreviewDraw";
import './preview.scss'
import {useZIndex} from "element-plus";
import {buttonEvent} from "@/eventlist/buttonEvent";
import {inputEvent} from "@/eventlist/inputEvent";
import {textEvent} from "@/eventlist/textEvent";

export default defineComponent({
    props: {
        data: {type: Object},
        block: {type: Object},
        index: {type: Number}
    },

    setup(props) {

        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`,
        }));

        // console.log(props.block)


        const config = inject('config')

        const blockRef = ref(null);

        // 从菜单栏到内容画布实现的第一次渲染
        onMounted(() => {
            if (props.block.key === "button") {
                buttonPreviewDraw(blockRef, props.data, props.index)
                buttonEvent(blockRef, props.block)
                // console.log()
            } else if (props.block.key === "text") {
                textPreviewDraw(blockRef, props.data, props.index)
                textEvent(blockRef, props.block)
            } else if (props.block.key === "input") {
                inputPreviewDraw(blockRef, props.data, props.index)
                inputEvent(blockRef, props.block)
                // console.log(blockRef.value)
            }
        })

        return () => {
            const component = config.componentMap[props.block.key];

            const RenderComponent = component.render();
            // console.log(RenderComponent)
            return <div class="preview-block" style={blockStyles.value} ref={blockRef}>
                {RenderComponent}
                {/*<input onclick={()=>blockRef.value.children[0].children[0].value='ahh'}/>*/}
            </div>
        }
    }
})