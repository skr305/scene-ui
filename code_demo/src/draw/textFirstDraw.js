export function textFirstDraw(blockRef, data, offsetWidth, offsetHeight, id) {

    // console.log(blockRef.value)
    blockRef.value.children[0].style.color = "#000000";
    blockRef.value.children[0].style.fontSize = "15px";
    blockRef.value.children[0].style.fontWeight = 500;
    blockRef.value.children[0].style.lineHeight = "20px";
    blockRef.value.children[0].style.letterSpacing = "0px";
    blockRef.value.children[0].style.opacity = 1;

    let style = data.value.style;

    if (data.value.blocks.length - data.value.style.length === 1) {
        data.value = {
            ...data.value, style: [
                ...style,
                {
                    width: offsetWidth,
                    height: offsetHeight,
                    color: blockRef.value.children[0].style.color,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 10,
                    letterSpacing: 0,
                    opacity: 1,
                    innerHTML: "渲染文本",
                }
            ]
        }
    }

    if (data.value.blocks.length === data.value.style.length) {
        blockRef.value.style.width = `${data.value.style[id].width}px`;
        // block.width = data.value.style[id].width;
        blockRef.value.style.height = `${data.value.style[id].height}px`;
        // block.height = data.value.style[id].height;
        blockRef.value.children[0].style.color = data.value.style[id].color;
        blockRef.value.children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
        blockRef.value.children[0].style.fontWeight = data.value.style[id].fontWeight;
        blockRef.value.children[0].style.lineHeight = `${data.value.style[id].paddingTop}px`;
        blockRef.value.children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
        blockRef.value.children[0].style.opacity = data.value.style[id].opacity;
        blockRef.value.children[0].innerHTML = data.value.style[id].innerHTML;
    }

    // console.log(data.value.blocks.length)
    // console.log(data.value.style.length)
}