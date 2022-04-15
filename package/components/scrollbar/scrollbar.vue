<template>
    <div class="scene-scrollbar"
        :style="{width: width + 'px', height: height + 'px'}"
        ref="el"
        @mouseenter="onEnter()" 
        @mouseleave="onLeave()"
    >
        <div class="scene-scrollbar-wrap" 
            :style="wrapStyle"
            ref="wrap"
        >
            <slot></slot>
        </div>
        <transition name="fade">
            <button
                class="scene-scrollbar-thumb"
                ref="thumbY"
                v-show="showThumb.y"
                :style="thumbStyle.y"
            ></button>
        </transition>
        <transition name="fade">
            <button
                class="scene-scrollbar-thumb"
                ref="thumbX"
                v-show="showThumb.x"
                :style="thumbStyle.x"
            ></button>
        </transition>
    </div>
</template>

<script lang='ts'>
import {defineComponent, ref, reactive, onMounted, onUnmounted} from 'vue'
import { scrollbarProps } from './scrollbar'
import {ThemeColorMap} from '../../core/constants/constants'
import '../../styles/global.css'

/** 根据不同的浏览器计算滚动条的厚度 */
const scrollbarSize = (function() {
    const el = document.createElement("div");
    el.style.width = "100px";
    el.style.height = "100px";
    el.style.overflow = "scroll";
    document.body.appendChild(el);
    const width = el.offsetWidth - el.clientWidth; //clientWidth = width + padding; offsetWidth = width + padding + scrollWidth + border
    el.remove();
    return width;
})();

export default defineComponent({
  name:'',
  props:scrollbarProps,
  setup(props,{emit,attrs,slots,expose}){
    
    /**
     *  DOM元素的引用
     */
    const el = ref<HTMLElement>();//组件整体节点 
    const wrap = ref<HTMLElement>();// 插槽包围器节点
    const thumbX = ref<HTMLElement>();// x轴滚动条节点
    const thumbY = ref<HTMLElement>();// y轴滚动条节点

    /**
     *  样式响应性变量
     */
    const wrapStyle = reactive({
        width: "",
        height: "",
    });
    const thumbStyle = reactive({
        x: {
            padding: '0',
            width: "",
            height: "",
            left: "",
            bottom: "",
            transform: "",
            borderRadius: "",
            backgroundColor: ThemeColorMap.get(props.theme)
        },
        y: {
            padding: '0',
            width: "",
            height: "",
            top: "",
            right: "",
            transform: "",
            borderRadius: "",
            backgroundColor: ThemeColorMap.get(props.theme)
        }
    });

    // 是否显示滚动条
    const showThumb = reactive({
        x:false,
        y:false,
    });
    // 是否有必要显示滚动条
    const mustShowThumb = reactive({
        x:true,
        y:true
    })


    /**
    * 更新包裹容器样式
    */
    function updateWrapStyle() {
        const parent = el.value!.parentNode as HTMLElement;
        parent.style.overflow = "hidden"; // 这里一定要将父元素设置超出隐藏，不然弹性盒子布局时会撑开宽高
        const css = getComputedStyle(parent);
        // console.log("父元素边框尺寸 >>", css.borderLeftWidth, css.borderRightWidth, css.borderTopWidth, css.borderBottomWidth);
        wrapStyle.width = `calc(100% + ${scrollbarSize}px + ${css.borderLeftWidth} + ${css.borderRightWidth})`;
        wrapStyle.height = `calc(100% + ${scrollbarSize}px + ${css.borderTopWidth} + ${css.borderBottomWidth})`;
    }

    /** 初始化滚动指示器样式 */
    function initThumbStyle() {
        thumbStyle.y.right = thumbStyle.y.top = "0px";
        thumbStyle.y.width = props.thumbSize + 'px';    // 滚动条的厚度
        thumbStyle.x.bottom = thumbStyle.x.left = "0px";
        thumbStyle.x.height = props.thumbSize + 'px';   // 滚动条的厚度
        thumbStyle.x.borderRadius = thumbStyle.y.borderRadius = `${props.thumbSize / 2}px`;
    }

    /**
    * 更新滚动指示器样式——滚动指示器的长度
    */
    function updateThumbStyle() {
        const wrapEl = wrap.value;
        if (wrapEl) {
            let height = wrapEl.clientHeight / wrapEl.scrollHeight * 100;  // 整个warp的可视高度与warp包裹的div的高度的比值
            if (height >= 100){
                // 不需要滚动条
                height = 0;
                mustShowThumb.y = false;
            } 
            thumbStyle.y.height = height + "%";
            thumbStyle.y.transform = `translateY(${wrapEl.scrollTop / wrapEl.scrollHeight * wrapEl.clientHeight}px)`;

            let width = (wrapEl.clientWidth / wrapEl.scrollWidth) * 100;  // 整个warp的可视宽度与warp包裹的div的宽度的比值
            if (width >= 100){
                // 不需要滚动条
                width = 0;
                mustShowThumb.x = false;
            } 
            thumbStyle.x.width = width + "%";
            thumbStyle.x.transform = `translateX(${wrapEl.scrollLeft / wrapEl.scrollWidth * wrapEl.clientWidth}px)`;
        }
    }

    /** 是否摁下开始拖拽 */
    let isDrag = false;
    /** 是否垂直模式 */
    let vertical = false;
    /** 摁下滚动条时的偏移量 */
    let deviation = 0;
    /** 更新延时器 */
    let timer: NodeJS.Timeout;


    function onDragStart(event: MouseEvent) {
        // console.log("摁下 >>", event);
        const _thumbX = thumbX.value!;
        const _thumbY = thumbY.value!;
        const target = event.target as HTMLElement; // 获取鼠标事件的目标DOM node
        // 判断拖拽的是哪个滚动条
        if (_thumbX.contains(target)) {
            isDrag = true;
            vertical = false;
            deviation = event.clientX - _thumbX.getBoundingClientRect().left;
        }
        if (_thumbY.contains(target)) {
            isDrag = true;
            vertical = true;
            deviation = event.clientY - _thumbY.getBoundingClientRect().top;
        }
    }

    function onDragMove(event: MouseEvent) {
        if (!isDrag) return;
        // console.log("拖拽移动 >>", event.offsetY, event.clientY, event);
        const wrapEl = wrap.value!;
        if (vertical) {
            const wrapTop = wrapEl.getBoundingClientRect().top;
            const wrapHeight = wrapEl.clientHeight;
            let value = event.clientY - wrapTop;
            // _thumbY.getBoundingClientRect().top - wrapEl.getBoundingClientRect().top = 拖动滚动条移动的距离
            // 再除以包裹div的高度计算出移动的百分比，乘上未压缩的高度就是需要移动距离
            wrapEl.scrollTop = (value - deviation) / wrapHeight * wrapEl.scrollHeight; //这个元素的内容顶部（卷起来的）到它的视图可见内容（的顶部）的距离
        } else {
            const wrapLeft = wrapEl.getBoundingClientRect().left;
            const wrapWidth = wrapEl.clientWidth;
            let value = event.clientX - wrapLeft;
            wrapEl.scrollLeft = (value - deviation) / wrapWidth * wrapEl.scrollWidth;
        }
    }

    function onDragEnd(event: MouseEvent) {
        // console.log("抬起");
        isDrag = false;
        if (el.value!.contains(event.target as HTMLElement)) {
            if (props.clickUpdateDelay > 0) {
                timer && clearTimeout(timer);
                timer = setTimeout(updateThumbStyle, props.clickUpdateDelay);
            }
        } else {
            showThumb.x = false;
            showThumb.y = false;
        }
    }

    /**
     * 控制 滚动包裹的元素自动移动 distance px的距离，实现滚动条的移动
     */
    function moveTo(distance: number,direction: 'Y'|'X'){
        const wrapEl = wrap.value!;
        if(direction === 'Y')
            wrapEl.scrollTop = distance
        else
            wrapEl.scrollLeft = distance
    }


    // 鼠标进入滚动条区域，显示滚动条
    // 添加如果没有超过props的宽高则不显示
    function onEnter() {
        if(mustShowThumb.x)
            showThumb.x = true;
        if(mustShowThumb.y)
            showThumb.y = true;
        updateThumbStyle();
    }
    // 鼠标离开滚动条区域，隐藏滚动条
    function onLeave() {
        if (!isDrag) {
            showThumb.x = false;
            showThumb.y = false;
        }
    }

    // 修改document 为 el 防止与其他点击事件冲突
    onMounted(()=>{
        updateWrapStyle();
        initThumbStyle();
        wrap.value && wrap.value.addEventListener("scroll", updateThumbStyle);
        el.value!.addEventListener("mousedown", onDragStart);
        el.value!.addEventListener("mousemove", onDragMove);
        el.value!.addEventListener("mouseup", onDragEnd);
    });

    onUnmounted(()=>{
        if(el.value){
            wrap.value && wrap.value.removeEventListener("scroll", updateThumbStyle);
            el.value!.removeEventListener("mousedown", onDragStart);
            el.value!.removeEventListener("mousemove", onDragMove);
            el.value!.removeEventListener("mouseup", onDragEnd);
            timer && clearTimeout(timer);
        }
    });


    return {
        el,
        wrap,
        thumbX,
        thumbY,
        wrapStyle,
        thumbStyle,
        showThumb,
        updateThumbStyle,
        onEnter,
        onLeave,
        moveTo
    }
  }
})
</script>
<style scoped>
.scene-scrollbar{
    display: inline-block;
    overflow: hidden; /** 隐藏了溢出的部分 */
    position: relative;
}
.scene-scrollbar .scene-scrollbar-wrap{
    overflow: scroll; 
}
.scene-scrollbar .scene-scrollbar-thumb{
    position: absolute;
    z-index: 10001;
    outline: none;
    border: none;
}
</style>