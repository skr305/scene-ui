"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAttrs = exports.parseElement = void 0;
const base_error_1 = __importDefault(require("../core/error/base-error"));
const error_code_1 = require("../core/error/error-code");
const keyof_1 = require("../util/keyof");
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
            let attrs = '';
            if (vnode.attributes)
                attrs = parseAttrs(vnode.attributes);
            return `<${vnode.tagName} ${attrs}></${vnode.tagName}>`;
        }
        else {
            let childrenContents = [];
            for (let childNode of vnode.children) {
                let childContent = parseElement(childNode);
                childrenContents.push(childContent);
            }
            let attrs = '';
            if (vnode.attributes)
                attrs = parseAttrs(vnode.attributes);
            return `<${vnode.tagName} ${attrs}>${childrenContents.join('')}</${vnode.tagName}>`;
        }
    }
}
exports.parseElement = parseElement;
function parseAttrs(attrs) {
    let attrsStr = '';
    if (Object.keys(attrs).length === 0) {
        return '';
    }
    else {
        for (let key in attrs) {
            if ((0, keyof_1.isValidKey)(key, attrs)) {
                if (key === 'style') {
                    let styleStr = '';
                    let styleObj = attrs[key];
                    for (let styleKey in styleObj) {
                        if ((0, keyof_1.isValidKey)(styleKey, styleObj))
                            styleStr += `${styleKey}=${styleObj[styleKey]};`;
                    }
                    attrsStr += `style="${styleStr}" `;
                }
                else {
                    let otherStr = `${key}="${attrs[key]}" `;
                    attrsStr += otherStr;
                }
            }
        }
        return attrsStr;
    }
}
exports.parseAttrs = parseAttrs;
