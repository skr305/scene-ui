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
                <el-form>
                    <h3 align="center">跳转事件</h3>
                    <el-form-item>
                        <el-input v-model={eventList.value.jumpEvent}  type="textarea"
                                   placeholder="请输入完整的url网址"/>
                    </el-form-item>
                    <el-form-item>
                        <ElButton onclick={() => onSubmitJump()}>添加事件</ElButton>
                    </el-form-item>
                </el-form>
                <br/><br/><br/><br/><br/>
                <el-form>
                    <h3 align="center">alter事件</h3>
                    <el-form-item>
                        <el-input v-model={eventList.value.alterEvent} type="textarea"
                                  placeholder="请输入要alter的内容"/>
                    </el-form-item>
                    <el-form-item>
                        <ElButton onclick={() => onSubmitAlter()}>添加事件</ElButton>
                    </el-form-item>
                </el-form>
            </div>
        }
    }
})