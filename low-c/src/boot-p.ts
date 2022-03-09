import { parseElement } from "./vue-generator/parse";
import { VNode } from "./vue-generator/type";

let textNode = new VNode('text',undefined,'text',undefined,undefined)
let commentNode = new VNode('comment',undefined,'conmment',undefined,undefined)
let div1 = new VNode('htmlElement','div',undefined,{class:'div1',style:{width:'100px',height:'100px'}},[textNode,commentNode])
let div2 = new VNode('htmlElement','div',undefined,{class:'div2',style:{width:'100px',height:'100px'}},[textNode,commentNode])
let div3 = new VNode('htmlElement','div',undefined,{class:'div3',style:{width:'100px',height:'100px'}},[textNode,commentNode])
let root = new VNode('htmlElement','div',undefined,{class:'root',style:{width:'100px',height:'100px'}},[div1,div2,div3])
console.log(parseElement(root))