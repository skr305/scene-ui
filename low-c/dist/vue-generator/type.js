"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VNode = void 0;
class VNode {
    constructor(type, tagName, value, attributes, children) {
        this.type = type;
        this.tagName = tagName;
        this.value = value;
        this.attributes = attributes;
        this.children = children;
    }
}
exports.VNode = VNode;
