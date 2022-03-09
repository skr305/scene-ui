export type NodeType = 'text' | 'comment' | 'htmlElement'

export class VNode{
    type: NodeType  // 虚拟节点类型
    tagName?: string   // 虚拟节点 tagName
    value?: string  // 当结点类型是text 或 comments时的值，htmlElement的话，应该存在子节点中
    attributes?: object   // 属性 {'style':'{}','@click':'()=>{}','v-model:name':'name'}
    children?: VNode[]  // 子节点
    constructor(type: NodeType, tagName?: string, value?:string, attributes?:object, children?:VNode[]){
        this.type = type;
        this.tagName = tagName;
        this.value = value;
        this.attributes = attributes;
        this.children = children;
    }
}