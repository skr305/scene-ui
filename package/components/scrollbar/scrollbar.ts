import {ComponentConstants} from '../../core/constants'

export const scrollbarProps = {
    width:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    /** 滚动条厚度 */
    thumbSize: {
        type: Number,
        default: 6
    },
    /** 滚动条颜色 */
    theme: {
        type: String,
        default: 'main',
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
    /**
    * 内部有点击事件时，延时更新滚动条的时间，0为不执行，单位毫秒
    * - 使用场景：内部有子节点尺寸变动撑开包裹器的滚动尺寸时，并且带有动画的情况，这时设置的延迟就为动画持续时间
    */
    clickUpdateDelay: {
        type: Number,
        default: 0
    },
}