// 画布中组件的渲染
import {computed, defineComponent, inject, onMounted, onUpdated, ref} from "vue";
import {buttonFirstDraw} from "@/draw/buttonFirstDraw";
import {buttonLastDraw} from "@/draw/buttonLastDraw";
import {textFirstDraw} from "@/draw/textFirstDraw";
import {textLastDraw} from "@/draw/textLastDraw";
import {inputFirstDraw} from "@/draw/inputFirstDraw";
import {inputLastDraw} from "@/draw/inputLastDraw";

export default defineComponent({
    props: {
        data: {type: Object},
        block: {type: Object},
        idx: Number
    },
    setup(props) {

        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`,
        }));

        const config = inject('config');
        // console.log(config)


        const blockRef = ref(null);

        // 从菜单栏到内容画布实现的第一次渲染
        onMounted(() => {
            let {offsetWidth, offsetHeight} = blockRef.value;
            if (props.block.alignCenter) {
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;
                props.block.alignCenter = false;
            }
            // console.log(props.block)
            props.block.width = offsetWidth + 5;
            props.block.height = offsetHeight + 5;
            // console.log(props.block.key)

            if (props.block.key === "button") {
                buttonFirstDraw(blockRef, props.data, offsetWidth, offsetHeight);
            } else if (props.block.key === "text") {
                textFirstDraw(blockRef, props.data, offsetWidth, offsetHeight);
                // console.log(props.data.value)
            } else if (props.block.key === "input") {
                inputFirstDraw(blockRef, props.data)
                // console.log(props.data.value)
            }

            // console.log(blockRef.value.style.width)
            // console.log(blockRef.value.children[0].innerHTML)
        })


        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[props.block.key];

            if (props.block.focus === true) {
                props.data.value.blocks.forEach((block, id) => {
                    if (block.focus === true && block.key === "button") {
                        buttonLastDraw(blockRef, props.block, props.data, id)
                    } else if (block.focus === true && block.key === "text") {
                        textLastDraw(blockRef, props.block, props.data, id)
                    } else if (block.focus === true && block.key === "input") {
                        inputLastDraw(blockRef, block, props.data, id)
                    }
                })
            }

            // 获取render函数
            const RenderComponent = component.render();
            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                <RenderComponent v-bind:style={data.value.style[props.idx]}/>
            </div>
        }
    }
})