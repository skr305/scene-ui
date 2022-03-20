export function inputLastDraw(blockRef, block, data, id){

    blockRef.value.children[0].children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
    blockRef.value.children[0].children[0].style.fontWeight = data.value.style[id].fontWeight;
    blockRef.value.children[0].children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
    blockRef.value.children[0].children[0].style.opacity = data.value.style[id].opacity;
    blockRef.value.children[0].children[0].value = data.value.style[id].value
    blockRef.value.children[0].children[0].placeholder = data.value.style[id].placeholder
    blockRef.value.children[0].children[0].type = data.value.style[id].type
    blockRef.value.children[0].children[0].max = data.value.style[id].max
}