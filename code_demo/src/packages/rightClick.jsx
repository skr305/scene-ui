import {computed, defineComponent} from "vue";
import "./rightClick.scss"
import {copy} from "@/contextmenu/copy";
import {stick} from "@/contextmenu/stick";
import {shear} from "@/contextmenu/shear";
import {Delete} from "@/contextmenu/delete";
import {lock} from "@/contextmenu/lock";
import {unlock} from "@/contextmenu/unlock";
import {top} from "@/contextmenu/top";
import {bottom} from "@/contextmenu/bottom";
import {moveUp} from "@/contextmenu/moveUp";
import {moveDown} from "@/contextmenu/moveDown";

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },

    setup: function (props) {
        const copyContent = computed({
            get() {
                return props.modelValue
            }
        })


        return () => {
            // let blockDemo = {};
            // copyContent.value.data.blocks.forEach((block, idx) => {
            //     if (block.focus) {
            //         blockDemo = copyContent.value.data.blocks[idx]
            //         // console.log(JSON.stringify(copyContent.value.data.blocks[idx]))
            //     }
            // })

            // console.log(JSON.stringify(blockDemo))
            const menuStyles = computed((e) => ({
                top: `${copyContent.value.startY}px`,
                left: `${copyContent.value.startX}px`,
            }));
            // console.log(copyMenuStyles.value)


            // // 设置计算属性，用来实现组件和属性栏之间的数据绑定
            // const attrs_style = computed(() => {
            //     let style = null;
            //     let block = null;
            //     return {style, block}
            // })
            //
            // copyContent.value.data.blocks.forEach((block, id) => {
            //     if (block.focus === true) {
            //         attrs_style.value.block = copyContent.value.data.blocks[id];
            //         // console.log(typeof(attrs_style.value.block.left))
            //         attrs_style.value.style = copyContent.value.data.style[id];
            //         // console.log(attrs_style.value.attribute.color)
            //     }
            // })
            //
            // console.log(JSON.stringify(props.modelValue))
            // console.log(props)
            // // console.log(JSON.stringify(attrs_style.value))

            // console.log(JSON.stringify(copyContent.value.blockRightClickBox))
            // let unlockRightClickBox = false


            return <div>
                <div style={menuStyles.value} class="contextmenu" v-show={copyContent.value.blockRightClickBox}>
                    {/*<div class="contextmenu">*/}
                    <ul>
                        <li onmousedown={() => copy(copyContent)}>复制</li>
                        <li onmousedown={() => shear(copyContent)}>剪切</li>
                        <li onmousedown={() => Delete(copyContent)}>删除</li>
                        <li onmousedown={() => lock(copyContent)}>锁定</li>
                        <li onmousedown={() => top(copyContent)}>置顶</li>
                        <li onmousedown={() => bottom(copyContent)}>置底</li>
                        <li onmousedown={() => moveUp(copyContent)}> 上移</li>
                        <li onmousedown={() => moveDown(copyContent)}>下移</li>
                    </ul>
                </div>
                <div style={menuStyles.value} className="contextmenu" v-show={copyContent.value.unlockRightClickBox}>
                    {/*<div className="contextmenu">*/}
                    <ul>
                        <li onmousedown={() => unlock(copyContent)}>解锁</li>
                    </ul>
                </div>
                <div style={menuStyles.value} className="contextmenu" v-show={copyContent.value.containerRightClickBox}>
                    {/*<div className="contextmenu">*/}
                    <ul>
                        <li onmousedown={() => stick(copyContent)}>粘贴</li>
                    </ul>
                </div>
            </div>
        }
    }
})