export function buttonFirstDraw(blockRef, data, offsetWidth, offsetHeight) {

    blockRef.value.children[0].style.color = "#000000";
    blockRef.value.children[0].style.background = "#FFFFFF";
    blockRef.value.children[0].style.borderWidth = "0px";
    blockRef.value.children[0].style.borderColor = "#D3D3D3";
    blockRef.value.children[0].style.borderRadius = "0%";
    blockRef.value.children[0].style.fontSize = "15px";
    blockRef.value.children[0].style.fontWeight = 500;
    blockRef.value.children[0].style.lineHeight = "100px";//有点bug
    blockRef.value.children[0].style.letterSpacing = "0px";
    blockRef.value.children[0].style.opacity = 1;

    let style = data.value.style; // 内部已经渲染的组件
    data.value = {
        ...data.value, style: [
            ...style,
            {
                width: offsetWidth,
                height: offsetHeight,
                color: blockRef.value.children[0].style.color,
                background: blockRef.value.children[0].style.background,
                borderWidth: 0,
                borderColor: blockRef.value.children[0].style.borderColor,
                borderRadius: 0,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 10,
                letterSpacing: 0,
                opacity: 1,
                innerHTML: "渲染按钮",
            }
        ]
    }
}