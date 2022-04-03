// 实现组件 （top） 拖动改变大小

import {events} from "@/packages/events";

export function topSizeChange(data) {

    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false
    }

    const mousedownTop = (e) => {
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

    const mousemove = (e) => {
        // e.path[1].style.cursor = 'n-resize'
        // e.path[2].style.cursor = 'n-resize'
        let {clientX: moveX, clientY: moveY} = e;


        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start');
        }

        data.value.blocks.forEach((block, idx) => {
            if (block.focus) {
                let durY = dragState.startY - moveY;
                if (moveY - dragState.startY < data.value.style[idx].height) {
                    dragState.startY = moveY;

                    data.value.style[idx].height = data.value.style[idx].height + durY;
                    data.value.blocks[idx].top = data.value.blocks[idx].top - durY;
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
        // e.path[1].style.cursor = 'default'
        // e.path[2].style.cursor = 'default'
        if (dragState.dragging) {
            dragState.dragging = false;
            events.emit('end');
        }
    }

    return {
        mousedownTop
    }
}