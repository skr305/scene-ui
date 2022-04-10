export function buttonPreviewDraw(blockRef, data, index) {

    blockRef.value.children[0].style.width = `${data.value.style[index].width}px`;
    blockRef.value.children[0].style.height = `${data.value.style[index].height}px`;
    blockRef.value.children[0].style.color = data.value.style[index].color;
    blockRef.value.children[0].style.background = data.value.style[index].background;
    blockRef.value.children[0].style.borderWidth = `${data.value.style[index].borderWidth}px`;
    blockRef.value.children[0].style.borderColor = data.value.style[index].borderColor;
    blockRef.value.children[0].style.borderRadius = `${data.value.style[index].borderRadius}%`;
    blockRef.value.children[0].style.fontSize = `${data.value.style[index].fontSize}px`;
    blockRef.value.children[0].style.fontWeight = data.value.style[index].fontWeight;
    blockRef.value.children[0].style.lineHeight = `${data.value.style[index].lineHeight}px`;
    blockRef.value.children[0].style.letterSpacing = `${data.value.style[index].letterSpacing}px`;
    blockRef.value.children[0].style.opacity = data.value.style[index].opacity;
    blockRef.value.children[0].children[0].innerHTML = data.value.style[index].innerHTML;

}