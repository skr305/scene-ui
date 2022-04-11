export function buttonFirstDraw(blockRef, data, offsetWidth, offsetHeight, id) {

    blockRef.value.children[0].style.color = "#606266";
    blockRef.value.children[0].style.background = "#FFFFFF";
    blockRef.value.children[0].style.borderWidth = "1px";
    blockRef.value.children[0].style.borderColor = "#D3D3D3";
    blockRef.value.children[0].style.borderRadius = "6%";
    blockRef.value.children[0].style.fontSize = "15px";
    blockRef.value.children[0].style.fontWeight = 500;
    blockRef.value.children[0].style.lineHeight = "100px";//有点bug
    blockRef.value.children[0].style.letterSpacing = "0px";
    blockRef.value.children[0].style.opacity = 1;


    let style = data.value.style; // 内部已经渲染的组件
    if (data.value.blocks.length - data.value.style.length === 1) {
        data.value = {
            ...data.value, style: [
                ...style,
                {
                    width: offsetWidth,
                    height: offsetHeight,
                    color: "#606266",
                    background: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#D3D3D3",
                    borderRadius: 6,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 10,
                    letterSpacing: 0,
                    opacity: 1,
                    innerHTML: "渲染按钮",
                }
            ]
        }
    }

    if (data.value.blocks.length === data.value.style.length) {
        blockRef.value.children[0].style.width = `${data.value.style[id].width}px`;
        // block.width = data.value.style[id].width;
        blockRef.value.children[0].style.height = `${data.value.style[id].height}px`;
        // block.height = data.value.style[id].height;
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
        blockRef.value.children[0].children[0].innerHTML = data.value.style[id].innerHTML;
    }

}