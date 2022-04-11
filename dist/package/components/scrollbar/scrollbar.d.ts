import { ComponentConstants } from '../../core/constants';
export declare const scrollbarProps: {
    width: {
        type: NumberConstructor;
        required: boolean;
    };
    height: {
        type: NumberConstructor;
        required: boolean;
    };
    /** 滚动条厚度 */
    thumbSize: {
        type: NumberConstructor;
        default: number;
    };
    /** 滚动条颜色 */
    theme: {
        type: StringConstructor;
        default: string;
        validator(value: ComponentConstants.StandardColor): boolean;
    };
    /**
    * 内部有点击事件时，延时更新滚动条的时间，0为不执行，单位毫秒
    * - 使用场景：内部有子节点尺寸变动撑开包裹器的滚动尺寸时，并且带有动画的情况，这时设置的延迟就为动画持续时间
    */
    clickUpdateDelay: {
        type: NumberConstructor;
        default: number;
    };
};
