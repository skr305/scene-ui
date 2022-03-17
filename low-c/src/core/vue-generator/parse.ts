import BaseError from "../error/base-error";
import { XLS_ERROR_CODE_SET } from "../error/error-code";
import { isValidKey } from "../../util/keyof";
import { EventString, pair, StyleObject, VNode } from "./type";

/**
 * 生成vue模板
 * @param vnode 虚拟节点
 * @returns vue模板字符串
 */
export function parseTemplate(vnode: VNode): string{
    let template: string = 
`${parseElement(vnode)}

<script>
export default {}
</script> 

<style>
</style>  
`
    return template
}

/**
 * 将虚拟DOM节点转换为 HTML标签字符串
 * @param vnode 虚拟DOM节点
 * @returns HTML标签字符串
 */
function parseElement(vnode: VNode): string{
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
    else{// 虚拟节点是HTML元素
        // 虚拟节点没有子节点，直接渲染返回
        if(!vnode.children){
            let attrs: string = parseAttrs(vnode)
            
            return `<${vnode.tagName} ${attrs}></${vnode.tagName}>`
        }else{
            // 虚拟节点有子节点，递归调用
            // 储存子节点编译后的字符串html标签
            let childrenContents: string[] = [] 
            for(let childNode of vnode.children){
                //递归生成 每个子节点的HTML标签 
                let childContent: string = parseElement(childNode);
                childrenContents.push(childContent);
            }
            // 生成当前父节点的属性
            let attrs: string = parseAttrs(vnode)
            
            let res =
`<${vnode.tagName} ${attrs}>
${childrenContents.join('\n')}
</${vnode.tagName}>`

            return res
        }
        
    }
}

/**
 * 生成虚拟节点的属性字符串
 * @param vnode 虚拟节点
 * @returns 
 */
function parseAttrs(vnode: VNode): string{
    let attrs: string = ''
    // 是否存在属性
    if(vnode.style)
        attrs += parseStyle(vnode.style)+' '
    if(vnode.v_bind)
        attrs += parseBind(vnode.v_bind)+' '
    if(vnode.v_on)
        attrs += parseOn(vnode.v_on)+ ' '
    if(vnode.v_if)
        attrs += parseIf(vnode.v_if)+' '
    if(vnode.v_show)
        attrs += parseShow(vnode.v_show)+' '
    if(vnode.v_for)
        attrs += parseFor(vnode.v_for)+' '
    return attrs
}


/**
 * 将对象形式的style转化为字符串形式
 * @param styleObj 
 *              "style": {
                    "top": "100px",
                    "left": "100px",
                    "width": "100px",
                    "height": "100px"
                },
 * @returns style="top: 100px;left: 100px;width: 100px;height: 100px"
*/
function parseStyle(styleObj: StyleObject):string{
    if(Object.keys(styleObj).length === 0){ // styleObj是空对象
        return ''
    }else{
        let styleItems: string = '';
        for(let key in styleObj){
            if(isValidKey(key,styleObj)){// 判断key是否是style的属性，不懂请看isValidKey函数
               styleItems += `${key}: ${styleObj[key]};` 
            }
            
        }
        return `style="${styleItems}"`
    }
}

/**
 * 将 v_bind数组转化为v_bing字符串
 * @param pairs v_bind数组
 */
function parseBind(pairs : pair<string,string>[]): string{
    if(pairs.length === 0)
        return ''
    else{
        let bindStr = ''
        for(let pair of pairs){
            bindStr += `:${pair.key}="${pair.value}" `
        }
        return bindStr
    }
}

/**
 * 将 v_on数组转化为v_on字符串
 * @param pairs v_on数组
 */
 function parseOn(pairs : pair<EventString,string>[]): string{
    if(pairs.length === 0)
        return ''
    else{
        let onStr = ''
        for(let pair of pairs){
            onStr += `@${pair.key}="${pair.value}" `
        }
        return onStr
    }
}

function parseIf(variable: string,): string{
    if(variable === '')
        return ''
    else
        return `v-if="${variable}"`
}

function parseShow(variable: string): string{
    if(variable === '')
        return ''
    else
        return `v-show="${variable}"`
}

function parseFor(variable: string): string{
    if(variable === '')
        return ''
    else
        return `v-for="(item,index) in ${variable}"`
}


