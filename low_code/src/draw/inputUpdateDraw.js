export function inputUpdateDraw(blockRef, block, data, id) {
    // console.log(blockRef.value)
    if (blockRef.value != null) {
        blockRef.value.children[0].style.width = `${data.value.style[id].width}px`;
        block.width = data.value.style[id].width;
        blockRef.value.style.width = `${block.width}px`;
        blockRef.value.children[0].children[0].style.height = `${data.value.style[id].height}px`;
        block.height = data.value.style[id].height;
        blockRef.value.style.height = `${block.height}px`;
        blockRef.value.children[0].children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
        blockRef.value.children[0].children[0].style.fontWeight = data.value.style[id].fontWeight;
        blockRef.value.children[0].children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
        blockRef.value.children[0].children[0].style.opacity = data.value.style[id].opacity;
        blockRef.value.children[0].children[0].value = data.value.style[id].value
        blockRef.value.children[0].children[0].placeholder = data.value.style[id].placeholder
        blockRef.value.children[0].children[0].type = data.value.style[id].type
        blockRef.value.children[0].children[0].max = data.value.style[id].max
    }
}