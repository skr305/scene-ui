import {computed, defineComponent, onBeforeMount, onMounted, onUpdated} from "vue";
import {ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber} from "element-plus";
import {events} from "@/packages/events";


export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        ElInput,
        ElForm,
        ElFormItem,
        ElInputNumber,
        ElColorPicker
    },

    setup: function (props) {
        // 设置计算属性，以便于实现数据的双向绑定
        const attrs_style = computed({
            get() {
                return props.modelValue
            }
        })
        // onBeforeMount(()=>{
        //     console.log(attrs_style.value.attribute)
        // })
        // onMounted(()=>{
        //     console.log(attrs_style.value.attribute)
        // })
        // onUpdated((attrs_style)=>{
        //     console.log(attrs_style.value.attribute)
        // })
        return () => {
            // console.log(attrs_style.value.attribute)
            return <div>
                {
                    <div>
                        <el-form label-position="top">
                            <el-form-item label="X 坐标">
                                <el-input-number
                                    style="width: 100%"
                                    // change={events.emit("start")}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.block.left}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="Y 坐标">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.block.top}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="宽">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.width}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="高">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.height}>
                                </el-input-number>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left">
                            <el-form-item label="颜色">
                                <el-color-picker v-model={attrs_style.value.attribute.color}></el-color-picker>
                            </el-form-item>
                            <el-form-item label="背景色">
                                <el-color-picker v-model={attrs_style.value.attribute.background}></el-color-picker>
                            </el-form-item>
                            <el-form-item label="边框颜色">
                                <el-color-picker v-model={attrs_style.value.attribute.borderColor}></el-color-picker>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="top">
                            <el-form-item label="边框宽度">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.borderWidth}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="边框半径">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.borderRadius}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="字体大小">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.fontSize}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="字体粗细">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.fontWeight}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="行高">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.lineHeight}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="字间距">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    // controls-position="right"
                                    step={1}
                                    v-model={attrs_style.value.attribute.letterSpacing}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="透明度">
                                <el-input-number
                                    style="width: 100%"
                                    min={0}
                                    max={1}
                                    // controls-position="right"
                                    step={0.1}
                                    v-model={attrs_style.value.attribute.opacity}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="内容">
                                <el-input type="textarea" v-model={attrs_style.value.attribute.innerHTML}></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                }
            </div>
        }
    }
})