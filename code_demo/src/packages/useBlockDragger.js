// 实现组件拖拽功能
import {reactive} from "vue";
import {events} from "@/packages/events";

export function useBlockDragger(focusData, lastSelectBlock) {
    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false
    }
    let markLine = reactive({
        x: null,
        y: null
    })

    const mousedown = (e) => {
        if (focusData.value.focus[0].lock === false) {
            // e.dataTransfer.dropEffect = 'move';

            const {width: BWidth, height: BHeight} = lastSelectBlock.value;

            dragState = {
                startX: e.clientX,
                startY: e.clientY,
                startLeft: lastSelectBlock.value.left,
                startTop: lastSelectBlock.value.top,
                dragging: false,
                startPos: focusData.value.focus.map(({top, left}) => ({top, left})),
                lines: (() => {
                    const {unfocused} = focusData.value;

                    let lines = {x: [], y: []};
                    unfocused.forEach((block) => {
                        const {top: ATop, left: ALeft, width: AWidth, height: AHeight} = block;
                        // 顶对顶辅助线
                        lines.y.push({showTop: ATop, top: ATop});
                        // 顶对底辅助线
                        lines.y.push({showTop: ATop, top: ATop - BHeight});
                        // 中对中辅助线
                        lines.y.push({showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2});
                        // 底对顶辅助线
                        lines.y.push({showTop: ATop + AHeight, top: ATop + AHeight});
                        // 底对底辅助线
                        lines.y.push({showTop: ATop + AHeight, top: ATop + AHeight - BHeight});


                        // 左对左辅助线
                        lines.x.push({showLeft: ALeft, left: ALeft});
                        // 右对左辅助线
                        lines.x.push({showLeft: ALeft + AWidth, left: ALeft + AWidth});
                        // 中对中辅助线
                        lines.x.push({showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2});
                        // 右对右辅助线
                        lines.x.push({showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth});
                        // 左对右辅助线
                        lines.x.push({showLeft: ALeft, left: ALeft - BWidth});

                    });
                    return lines
                })()

            }
            document.addEventListener('mousemove', mousemove, {passive: false})
            document.addEventListener('mouseup', mouseup, {passive: false})
        }

    }
    const mousemove = (e) => {
        let {clientX: moveX, clientY: moveY} = e;

        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start');
        }

        let left = moveX - dragState.startX + dragState.startLeft;

        // console.log(moveX)
        // console.log(dragState.startX)
        // console.log(typeof(dragState.startLeft))

        let top = moveY - dragState.startY + dragState.startTop;

        //计算横线
        let y = null;
        let x = null;
        for (let i = 0; i < dragState.lines.y.length; i++) {
            const {top: t, showTop: s} = dragState.lines.y[i];
            if (Math.abs(t - top) < 5) {
                y = s;
                moveY = dragState.startY - dragState.startTop + t;
                break;
            }
        }
        for (let i = 0; i < dragState.lines.x.length; i++) {
            const {left: l, showLeft: s} = dragState.lines.x[i];
            if (Math.abs(l - left) < 5) {
                x = s;
                moveX = dragState.startX - dragState.startLeft + l;
                break;
            }
        }
        markLine.x = x;
        markLine.y = y;

        let durX = moveX - dragState.startX;
        let durY = moveY - dragState.startY;

        focusData.value.focus.forEach((block, idx) => {
            block.top = dragState.startPos[idx].top + durY;
            block.left = dragState.startPos[idx].left + durX;
            // console.log(block.top)
        })
    }

    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove, {passive: false})
        document.removeEventListener('mousemove', mouseup, {passive: false})
        markLine.x = null;
        markLine.y = null;
        if (dragState.dragging) {
            events.emit('end');
            dragState.dragging = false
        }
    }
    return {
        mousedown,
        markLine
    }
}