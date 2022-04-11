import {computed, defineComponent} from "vue";
import {ElButton, ElForm, ElFormItem, ElInput, ElMessage} from "element-plus";


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

        const eventList = computed({
            get() {
                return props.modelValue
            }
        })

        return () => {

            // console.log(eventList.value)
            const onSubmitJump = () => {
                if (eventList.value.jumpEvent === null) {
                    ElMessage({
                        message: '跳转网址不能为空，请重新添加',
                        type: 'warning',
                    })
                } else {
                    ElMessage({
                        message: '成功添加跳转网址',
                        type: 'success',
                    })
                }
            }

            const onSubmitAlter = () => {
                if (eventList.value.alterEvent === null) {
                    ElMessage({
                        message: 'alter的内容不能为空，请重新填写',
                        type: 'warning',
                    })
                } else {
                    ElMessage({
                        message: '成功添加alter内容',
                        type: 'success',
                    })
                }
            }

            return <div>
                <br/>

                    <h3 align="center">暂无事件</h3>

            </div>
        }
    }
})