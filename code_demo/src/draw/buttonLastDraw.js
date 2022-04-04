export function buttonLastDraw(blockRef, block, data, id) {

    // console.log(blockRef.value.children[0].className)
    if (blockRef.value !== null && blockRef.value.children[0].className === "el-button el-button--default") {
        blockRef.value.children[0].style.width = `${data.value.style[id].width}px`;
        block.width = data.value.style[id].width;
        blockRef.value.children[0].style.height = `${data.value.style[id].height}px`;
        block.height = data.value.style[id].height;
        blockRef.value.children[0].style.color = data.value.style[id].color;
        blockRef.value.children[0].style.background = data.value.style[id].background;
        blockRef.value.children[0].style.borderWidth = `${data.value.style[id].borderWidth}px`;
        blockRef.value.children[0].style.borderColor = data.value.style[id].borderColor;
        blockRef.value.children[0].style.borderRadius = `${data.value.style[id].borderRadius}%`;
        blockRef.value.children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
        blockRef.value.children[0].style.fontWeight = data.value.style[id].fontWeight;
        blockRef.value.children[0].style.lineHeight = `${data.value.style[id].paddingTop}px`;
        blockRef.value.children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
        blockRef.value.children[0].style.opacity = data.value.style[id].opacity;
        blockRef.value.children[0].children[0].innerText = data.value.style[id].innerHTML;
        // console.log(blockRef.value.children[0])
        // console.log(blockRef.value.children[0].style.opacity)
    }
}