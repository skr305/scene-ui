import {computed, defineComponent} from "vue";
import {ElSelect, ElOption, ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber} from "element-plus";


export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        ElInput,
        ElForm,
        ElFormItem,
        ElInputNumber,
        ElColorPicker,
        ElSelect,
        ElOption
    },

    setup: function (props) {
        const attrs_style = computed({
            get() {
                return props.modelValue
            }
        })
        return () => {
            const options = [
                {
                    value: 'text',
                    label: '文本',
                },
                {
                    value: 'password',
                    label: '密码',
                },]
            return <div>
                {
                    <div>
                        <el-form label-position="top">
                            <el-form-item label="X 坐标">
                                <el-input-number
                                    style="width: 100%"
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
                            <el-form-item label="字体大小">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    min={0}
                                    step={1}
                                    v-model={attrs_style.value.attribute.fontSize}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="字体粗细">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    min={0}
                                    step={1}
                                    v-model={attrs_style.value.attribute.fontWeight}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="字间距">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    min={0}
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
                            <el-form-item label="数据长度">
                                <el-input-number
                                    style="width: 100%"
                                    // controls-position="right"
                                    min={0}
                                    v-model={attrs_style.value.attribute.max}>
                                </el-input-number>
                            </el-form-item>
                            <el-form-item label="数据类型">
                                <el-select v-model={attrs_style.value.attribute.type} filterable placeholder="Select">
                                    {
                                        options.map(item => {
                                            return <el-option
                                                key={item.value}
                                                label={item.label}
                                                value={item.value}>
                                            </el-option>
                                        })
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item label="占位符">
                                <el-input type="textarea" v-model={attrs_style.value.attribute.placeholder}></el-input>
                            </el-form-item>
                            <el-form-item label="内容">
                                <el-input maxlength={attrs_style.value.attribute.max} type="textarea"
                                          v-model={attrs_style.value.attribute.value}></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                }
            </div>
        }
    }
})