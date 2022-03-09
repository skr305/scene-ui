import BaseError from "../core/error/base-error";
import { XLS_ERROR_CODE_SET } from "../core/error/error-code";
import { isValidKey } from "../util/keyof";
import { VNode } from "./type";

/**
 * 将虚拟DOM节点转换为 HTML标签字符串
 * @param vnode 虚拟DOM节点
 * @returns HTML标签字符串
 */
export function parseElement(vnode: VNode):string{
    if(vnode.type === 'text'){
        if(vnode.value)
            return vnode.value;
        else
            throw new BaseError(XLS_ERROR_CODE_SET.EMPTY_ERROR,'textNode can not be empty')
    }
    else if(vnode.type === 'comment')
        if(vnode.value)
            return `<!-- ${vnode.value} -->`
        else
            throw new BaseError(XLS_ERROR_CODE_SET.EMPTY_ERROR,'cmomentNode can not be empty')
    else{
        // 虚拟节点没有子节点，直接渲染返回
        if(!vnode.children){
            let attrs: string = ''
            // 是否存在属性
            if(vnode.attributes)
                attrs= parseAttrs(vnode.attributes)//{'style':{'width':'400px'},'@click':'func','v-model:name':'name'}

            return `<${vnode.tagName} ${attrs}></${vnode.tagName}>`
        }else{
            // 虚拟节点有子节点
            // 储存子节点编译后的字符串html标签
            let childrenContents: string[] = [] 
            for(let childNode of vnode.children){
                //递归生成 每个子节点的HTML标签 
                let childContent: string = parseElement(childNode);
                childrenContents.push(childContent);
            }
            
            let attrs: string = ''
            // 是否存在属性
            if(vnode.attributes)
                attrs= parseAttrs(vnode.attributes)//{'style':{'width':'400px'},'@click':'func','v-model:name':'name'}
            
            return `<${vnode.tagName} ${attrs}>${childrenContents.join('')}</${vnode.tagName}>`
        }
        
    }
}

/**
 * 将对象形式的HTML-Attribute转化为字符串形式
 * @param attrs：{'style':{'width':'400px'},'@click':'func','v-model:name':'name'}
 * @returns str：style="width: 500px;height: 500px;" @click="func" v-model:name="name"
*/
export function parseAttrs(attrs: object):string{
    let attrsStr: string = ''; //编译后的属性字符串
    if(Object.keys(attrs).length === 0){
        return ''
    }else{
        for(let key in attrs){
            if(isValidKey(key,attrs)){// 判断key是否是attrs的属性，不懂请看isValidKey函数
                if(key === 'style'){// 处理 CSS样式属性
                    let styleStr: string = ''
                    let styleObj: object = attrs[key] //{'width':'400px','height':'400px'}
                    for(let styleKey in styleObj){
                        if(isValidKey(styleKey,styleObj))
                            styleStr += `${styleKey}=${styleObj[styleKey]};`
                    }
                    attrsStr += `style="${styleStr}" `
                }else{// 处理其他属性 ，包括监听函数,vue指令等等 
                    let otherStr: string = `${key}="${attrs[key]}" `
                    attrsStr += otherStr;
                }
            }
            
        }
        return attrsStr
    }
}

