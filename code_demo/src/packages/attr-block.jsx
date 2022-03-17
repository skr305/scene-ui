import {computed, defineComponent, inject} from "vue";

import {ElForm, ElFormItem, ElInput, ElInputNumber} from 'element-plus'
import {parseWidth} from "element-plus/es/components/table/src/util";

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        ElInput,
        ElForm,
        ElFormItem,
        ElInputNumber
    },

    // emits: ['update:modelValue'],
    setup: function (props) {


        // 设置计算属性，以便于实现数据的双向绑定
        const data = computed({
            get() {
                return props.modelValue
            }
        })
        return () => {

            // 设置计算属性，用来实现组件和属性栏之间的数据绑定
            const attrs_style = computed(() => {
                let attribute = null;
                let block = null;
                return {attribute, block}
            })
            data.value.blocks.forEach((block, id) => {
                if (block.focus === true) {
                    attrs_style.value.block = data.value.blocks[id];
                    // console.log(typeof(attrs_style.value.block.left))
                    attrs_style.value.attribute = data.value.style[id];
                }
            })
            // console.log(JSON.stringify(attrs_style.value.block))
            // console.log(JSON.stringify(attrs_style.value.attribute))
            let visual = false;
            if (attrs_style.value.block != null) {
                visual = true;
            }
            return <div>
                {
                    visual ? (<el-form label-position="top">
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
                                // controls-position="right"
                                step={1}
                                v-model={attrs_style.value.attribute.width}>
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label="高">
                            <el-input-number
                                style="width: 100%"
                                // controls-position="right"
                                step={1}
                                v-model={attrs_style.value.attribute.height}>
                            </el-input-number>
                        </el-form-item>
                    </el-form>) : (<div>
                        <h3 align="center">请选择组件</h3>
                        <br/><br/>
                        <el-form label-position="top">
                            <el-form-item label="画布宽度">
                                <el-input v-model={data.value.container.width}></el-input>
                            </el-form-item>
                            <el-form-item label="画布高度">
                                <el-input v-model={data.value.container.height}></el-input>
                            </el-form-item>
                        </el-form>
                    </div>)
                }
            </div>
        }
    }
})