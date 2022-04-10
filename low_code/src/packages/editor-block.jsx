// 画布中组件的渲染
import {computed, defineComponent, inject, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import {buttonFirstDraw} from "@/draw/buttonFirstDraw";
import {buttonLastDraw} from "@/draw/buttonLastDraw";
import {textFirstDraw} from "@/draw/textFirstDraw";
import {textLastDraw} from "@/draw/textLastDraw";
import {inputFirstDraw} from "@/draw/inputFirstDraw";
import {inputLastDraw} from "@/draw/inputLastDraw";
import {buttonUpdateDraw} from "@/draw/buttonUpdateDraw";
import {inputUpdateDraw} from "@/draw/inputUpdateDraw";
import {textUpdataDraw} from "@/draw/textUpdataDraw";
import {bottomSizeChange} from "@/packages/subSizeChange/bottomSizeChange";
import {topSizeChange} from "@/packages/subSizeChange/topSizeChange";
import {rightSizeChange} from "@/packages/subSizeChange/rightSizeChange";
import {leftSizeChange} from "@/packages/subSizeChange/leftSizeChange";
import {right_bottomSizeChange} from "@/packages/subSizeChange/right_bottomSizeChange";
import {left_bottomSizeChange} from "@/packages/subSizeChange/left_bottomSizeChange";
import {right_topSizeChange} from "@/packages/subSizeChange/right_topSizeChange";
import {left_topSizeChange} from "@/packages/subSizeChange/left_topSizeChange";


export default defineComponent({
    props: {
        data: {type: Object},
        block: {type: Object},
        index: {type: Number}
        // style: { }
    },
    setup(props) {

        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`,
        }));

        const cursors = {}

        // 计算八个点的位置
        const getPointStyle = (point) => {
            const {width, height} = props.block
            const hasT = /t/.test(point)
            const hasB = /b/.test(point)
            const hasL = /l/.test(point)
            const hasR = /r/.test(point)
            let newLeft = 0
            let newTop = 0

            // 四个角的点
            if (point.length === 2) {
                newLeft = hasL ? 0 : width
                newTop = hasT ? 0 : height
            } else {
                // 上下两点的点，宽度居中
                if (hasT || hasB) {
                    newLeft = width / 2
                    newTop = hasT ? 0 : height
                }

                // 左右两边的点，高度居中
                if (hasL || hasR) {
                    newLeft = hasL ? 0 : width
                    newTop = Math.floor(height / 2)
                }
            }

            const style = {
                marginLeft: '-4px',
                marginTop: '-4px',
                left: `${newLeft}px`,
                top: `${newTop}px`,
                cursor: cursors[point],
            }
            return style
        }

        const config = inject('config');
        // console.log(config)

        const blockRef = ref(null);


        onUpdated(() => {
            // console.log(props.index +"   " + props.data.value.style.length)

            if (props.block.key === "button") {
                // console.log(props.block)
                buttonUpdateDraw(blockRef, props.block, props.data, props.index)
                // console.log(props.block)
            }
            if (props.block.key === "text") {
                textUpdataDraw(blockRef, props.block, props.data, props.index)
            }
            if (props.block.key === "input") {
                inputUpdateDraw(blockRef, props.block, props.data, props.index)
            }
            // console.log(blockRef.value.style)

            // console.log(props.data.value.blocks.length)
            // console.log(props.data.value.style.length)
        })


        // 从菜单栏到内容画布实现的第一次渲染
        onMounted(() => {
            // console.log("aaaa")
            let {offsetWidth, offsetHeight} = blockRef.value;
            if (props.block.alignCenter) {
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;
                props.block.alignCenter = false;
            }
            // console.log(props.block)
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;

            if (props.block.key === "button") {
                // console.log(props.index)
                buttonFirstDraw(blockRef, props.data, offsetWidth, offsetHeight, props.index);
            } else if (props.block.key === "text") {
                // console.log(222)
                textFirstDraw(blockRef, props.data, offsetWidth, offsetHeight, props.index);
                // console.log(props.data.value)
            } else if (props.block.key === "input") {
                // console.log(offsetWidth)
                inputFirstDraw(blockRef, props.data, offsetWidth, offsetHeight, props.index)
                // console.log(props.data.value)
            }


            // props.data.value.blocks.forEach((block, idx) => {
            //         props.data.value.blocks[idx].zIndex = idx;
            //         // console.log(JSON.stringify(props.data.value.blocks.length))
            //         // data.value.style.splice(idx, 1)
            //         // data.value.blocks.splice(idx, 1)
            //
            // })


            // console.log(JSON.stringify(props.data.value))
            // console.log(JSON.stringify(props.data.value.blocks.length))
            // console.log(JSON.stringify(props.data.value.style.length))
            // 删除后撤销时所用到的函数
            // if(props.data.value.blocks.length === props.data.value.style.length){
            //     props.data.value.blocks.forEach((block, id) => {
            //         console.log(props.data.value)
            //         if (block.key === "button") {
            //             buttonLastDraw(blockRef, props.block, props.data, id)
            //         } else if (block.key === "text") {
            //             textLastDraw(blockRef, props.block, props.data, id)
            //         } else if (block.key === "input") {
            //             inputLastDraw(blockRef, block, props.data, id)
            //         }
            //     })
            // }


            // console.log(props.data.value.style.width)
            // console.log(blockRef.value.children[0].innerHTML)
        })


        return () => {
            // 通过block的key属性直接获取对应的组件
            const component = config.componentMap[props.block.key];
            // console.log(JSON.stringify(props.block))
            // console.log(JSON.stringify(blockRef.value))


            // console.log(JSON.stringify(props.data.value.style))
            // if(props.data.value.blocks.length === props.data.value.style.length){
            //     props.data.value.blocks.forEach((block, id) => {
            //         if (block.key === "button") {
            //             buttonLastDraw(blockRef, props.block, props.data, id)
            //         } else if (block.key === "text") {
            //             textLastDraw(blockRef, props.block, props.data, id)
            //         } else if (block.key === "input") {
            //             inputLastDraw(blockRef, block, props.data, id)
            //         }
            //     })
            // }
            // console.log(JSON.stringify(props.data.value.blocks.length))
            // console.log(JSON.stringify(props.data.value.style.length))

            if (props.block.focus === true) {
                props.data.value.blocks.forEach((block, id) => {
                    if (block.focus === true && block.key === "button") {
                        // console.log(block)
                        buttonLastDraw(blockRef, props.block, props.data, id)
                    } else if (block.focus === true && block.key === "text") {
                        textLastDraw(blockRef, props.block, props.data, id)
                    } else if (block.focus === true && block.key === "input") {
                        inputLastDraw(blockRef, block, props.data, id)
                    }
                })
            }

            const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];
            // const ahh = ['ttt']
            // const ahh = 'pointer'
            let {mousedownBottom} = bottomSizeChange(props.data)
            let {mousedownTop} = topSizeChange(props.data)
            let {mousedownRight} = rightSizeChange(props.data)
            let {mousedownLeft} = leftSizeChange(props.data)
            let {mousedownRightBottom} = right_bottomSizeChange(props.data)
            let {mousedownLeftBottom} = left_bottomSizeChange(props.data)
            let {mousedownRightTop} = right_topSizeChange(props.data)
            let {mousedownLeftTop} = left_topSizeChange(props.data)

            // 获取render函数
            const RenderComponent = component.render();

            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                {
                    RenderComponent
                }
                {
                    (pointList.map((item, index) => {
                        if (index === 0 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownLeftTop(e)}
                                onmouseover={(e) => e.target.style.cursor = 'nw-resize'}
                            />
                        } else if (index === 1 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownTop(e)}
                                onmouseover={(e) => e.target.style.cursor = 'n-resize'}
                            />
                        } else if (index === 2 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownRightTop(e)}
                                onmouseover={(e) => e.target.style.cursor = 'ne-resize'}
                            />
                        } else if (index === 3 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownRight(e)}
                                onmouseover={(e) => e.target.style.cursor = 'e-resize'}
                            />
                        } else if (index === 4 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownRightBottom(e)}
                                onmouseover={(e) => e.target.style.cursor = 'se-resize'}
                            />
                        } else if (index === 5 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownBottom(e)}
                                onmouseover={(e) => e.target.style.cursor = 's-resize'}
                            />
                        } else if (index === 6 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownLeftBottom(e)}
                                onmouseover={(e) => e.target.style.cursor = 'sw-resize'}
                            />
                        } else if (index === 7 && props.block.lock === false) {
                            return <div
                                key="item"
                                style={getPointStyle(item)}
                                class={props.block.focus ? 'shape-point' : ''}
                                onmousedown={(e) => mousedownLeft(e)}
                                onmouseover={(e) => e.target.style.cursor = 'w-resize'}
                            />
                        }
                    }))
                }
            </div>
        }
    }
})