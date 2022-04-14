import { App, VNode } from 'vue';
/**
 * loading 组件的props类型
 */
export declare type loadingProps = {
    target: VNode | string | HTMLElement;
    fullScreen: boolean;
    text: string;
    onClose: Function;
};
/**
 * loading组件的内置data类型
 */
export declare type loadingData = {
    target: VNode | string | HTMLElement;
    fullScreen: boolean;
    text: string;
    onClose: Function;
    loadingVM: App<Element>;
    loadingMountElement: HTMLElement;
    visible: boolean;
    originalPosition: string;
    originalOverflow: string;
};
