export function textLastDraw(blockRef, block, data, id) {

    // console.log(blockRef.value)
    // todo 这里很可能在后期添加功能的时候出现bug，注意一下
    if (blockRef.value != null) {
        blockRef.value.style.width = `${data.value.style[id].width}px`;
        block.width = data.value.style[id].width;
        blockRef.value.style.height = `${data.value.style[id].height}px`;
        block.height = data.value.style[id].height;
        blockRef.value.children[0].style.color = data.value.style[id].color;
        blockRef.value.children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
        blockRef.value.children[0].style.fontWeight = data.value.style[id].fontWeight;
        blockRef.value.children[0].style.lineHeight = `${data.value.style[id].paddingTop}px`;
        blockRef.value.children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
        blockRef.value.children[0].style.opacity = data.value.style[id].opacity;
        blockRef.value.children[0].innerHTML = data.value.style[id].innerHTML;
    }
}