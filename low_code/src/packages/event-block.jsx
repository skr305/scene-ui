import {computed, ref, defineComponent} from "vue";
import {ElForm, ElFormItem, ElButton, ElInput, ElMessage, ElColorPicker} from 'element-plus'
import buttonPreview from "@/eventlist/buttonPreview";
import inputPreview from "@/eventlist/inputPreview";
import textPreview from "@/eventlist/textPreview";

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },

    components: {
        ElInput,
        ElForm,
        ElFormItem,
    },
    setup: function (props) {

        // 设置计算属性，以便于实现数据的双向绑定
        const data = computed({
            get() {
                return props.modelValue
            }
        })

        return () => {
            let Message;
            let visual = false;
            let index;

            data.value.blocks.forEach((block, id) => {
                if (block.focus === true) {
                    visual = true
                    index = id
                    if(data.value.blocks[id].key === "button"){
                        Message = (<buttonPreview v-model={data.value.blocks[index].trigger}/>)
                    } else if(data.value.blocks[id].key === "input"){
                        Message = (<inputPreview v-model={data.value.blocks[index].trigger}/>)
                    } else if(data.value.blocks[id].key === "text"){
                        Message = (<textPreview v-model={data.value.blocks[index].trigger}/>)
                    }
                }
            })

            return <div>
                {
                    visual ? (
                       Message
                    ) : (<div>
                        <h3 align="center">请选择组件</h3>
                    </div>)
                }
            </div>
        }
    }
})