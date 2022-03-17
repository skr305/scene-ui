// 画布中组件的渲染
import {computed, defineComponent, inject, onMounted, onUpdated, ref} from "vue";

export default defineComponent({
    props: {
        data: {type: Object},
        block: {type: Object},
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
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;


            let style = props.data.value.style; // 内部已经渲染的组件
            props.data.value = {
                ...props.data.value, style: [
                    ...style,
                    {
                        width: offsetWidth,
                        height: offsetHeight
                    }
                ]
            }
            blockRef.value.children[0].style.width = offsetWidth;
        })


        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[props.block.key];

            if (props.block.focus === true) {
                props.data.value.blocks.forEach((block, id) => {
                    if (block.focus === true) {
                        blockRef.value.children[0].style.width = `${props.data.value.style[id].width}px`;
                        props.block.width = props.data.value.style[id].width
                        blockRef.value.children[0].style.height = `${props.data.value.style[id].height}px`;
                        props.block.height = props.data.value.style[id].height
                    }
                })
            }

            // 获取render函数
            const RenderComponent = component.render();
            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                {RenderComponent}
            </div>
        }
    }
})