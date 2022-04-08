// 实现组件 （bottom） 拖动改变大小

import {events} from "@/packages/events";

export function bottomSizeChange(data) {

    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false
    }

    const mousedownBottom = (e) => {
        e.stopPropagation()
        e.preventDefault()

        data.value.blocks.forEach((block, idx) => {
            if (block.focus) {

                dragState = {
                    startX: e.clientX,
                    startY: e.clientY,
                    dragging: false
                }
                // console.log(durY)
                document.addEventListener('mousemove', mousemove, {passive: false})
                document.addEventListener('mouseup', mouseup, {passive: false})
            }
        })
    }

    // console.log(e.clientY)
    // console.log(e.clientY)
    const mousemove = (e) => {
        // console.log(e)
        // e.target.style.cursor = 's-resize'
        let {clientX: moveX, clientY: moveY} = e;


        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start');
        }
        // console.log(111)

        data.value.blocks.forEach((block, idx) => {
            if (block.focus) {
                let durY = moveY - dragState.startY;
                if (dragState.startY - moveY < data.value.style[idx].height) {
                    dragState.startY = moveY;

                    data.value.style[idx].height = data.value.style[idx].height + durY;
                } else {
                    data.value.style[idx].height = 0
                }

                // console.log(durY)
                // preDuringY = height;
                // console.log(typeof (data.value.style[idx].height))
            }
        })
    }

    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove, {passive: false})
        document.removeEventListener('mouseup', mouseup, {passive: false})
        // e.target.style.cursor = 'default'
        if (dragState.dragging) {
            dragState.dragging = false;
            events.emit('end');
        }
    }

    return {
        mousedownBottom
    }
}