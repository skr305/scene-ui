"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = void 0;
const base_error_1 = __importDefault(require("../error/base-error"));
const error_code_1 = require("../error/error-code");
const keyof_1 = require("../../util/keyof");
function parseTemplate(vnode) {
    let template = `${parseElement(vnode)}

<script>
export default {}
</script> 

<style>
</style>  
`;
    return template;
}
exports.parseTemplate = parseTemplate;
function parseElement(vnode) {
    if (vnode.type === 'text') {
        if (vnode.value)
            return vnode.value;
        else
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.EMPTY_ERROR, 'textNode can not be empty');
    }
    else if (vnode.type === 'comment')
        if (vnode.value)
            return `<!-- ${vnode.value} -->`;
        else
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.EMPTY_ERROR, 'cmomentNode can not be empty');
    else {
        if (!vnode.children) {
            let attrs = parseAttrs(vnode);
            return `<${vnode.tagName} ${attrs}></${vnode.tagName}>`;
        }
        else {
            let childrenContents = [];
            for (let childNode of vnode.children) {
                let childContent = parseElement(childNode);
                childrenContents.push(childContent);
            }
            let attrs = parseAttrs(vnode);
            let res = `<${vnode.tagName} ${attrs}>
${childrenContents.join('\n')}
</${vnode.tagName}>`;
            return res;
        }
    }
}
function parseAttrs(vnode) {
    let attrs = '';
    if (vnode.style)
        attrs += parseStyle(vnode.style) + ' ';
    if (vnode.v_bind)
        attrs += parseBind(vnode.v_bind) + ' ';
    if (vnode.v_on)
        attrs += parseOn(vnode.v_on) + ' ';
    if (vnode.v_if)
        attrs += parseIf(vnode.v_if) + ' ';
    if (vnode.v_show)
        attrs += parseShow(vnode.v_show) + ' ';
    if (vnode.v_for)
        attrs += parseFor(vnode.v_for) + ' ';
    return attrs;
}
function parseStyle(styleObj) {
    if (Object.keys(styleObj).length === 0) {
        return '';
    }
    else {
        let styleItems = '';
        for (let key in styleObj) {
            if ((0, keyof_1.isValidKey)(key, styleObj)) {
                styleItems += `${key}: ${styleObj[key]};`;
            }
        }
        return `style="${styleItems}"`;
    }
}
function parseBind(pairs) {
    if (pairs.length === 0)
        return '';
    else {
        let bindStr = '';
        for (let pair of pairs) {
            bindStr += `:${pair.key}="${pair.value}" `;
        }
        return bindStr;
    }
}
function parseOn(pairs) {
    if (pairs.length === 0)
        return '';
    else {
        let onStr = '';
        for (let pair of pairs) {
            onStr += `@${pair.key}="${pair.value}" `;
        }
        return onStr;
    }
}
function parseIf(variable) {
    if (variable === '')
        return '';
    else
        return `v-if="${variable}"`;
}
function parseShow(variable) {
    if (variable === '')
        return '';
    else
        return `v-show="${variable}"`;
}
function parseFor(variable) {
    if (variable === '')
        return '';
    else
        return `v-for="(item,index) in ${variable}"`;
}
