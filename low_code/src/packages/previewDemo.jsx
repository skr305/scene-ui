import {computed, defineComponent} from "vue";
import {ElButton} from "element-plus";
import './preview.scss'
import PreviewBlock from "./preview-block"

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        ElButton
    },

    setup: function (props) {

        // 设置计算属性，以便于实现数据的双向绑定
        const data = computed({
            get() {
                return props.modelValue
            }
        })

        // 设置计算属性，用来改变和渲染画布的大小
        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px',
        }))

        return () => {
            // console.log(data.value.previewDemo)

            if (data.value.previewDemo === true) {
                return <div class="bg">
                    <ElButton class="close" onclick={() => data.value.previewDemo = false}>关闭</ElButton>
                    <div class="canvas-container">
                        <div class="canvas" style={containerStyles.value}>
                            {
                                (data.value.blocks.map((block, index) => {
                                    return <PreviewBlock
                                        block={block}
                                        data={data}
                                        index={index}
                                    />
                                }))
                            }
                        </div>
                    </div>
                </div>
            } else {
                return <div></div>
            }
        }
    }
})