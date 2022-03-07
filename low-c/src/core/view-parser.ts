/**
 * @author: skr305
 * 简单的思考一下语法的问题吧: 分隔符用;
 * 之后的参数全部由space+,为分隔符来代替
 */

/**
 * @param tag the tag of element
 * demo: h1 => [<h1>\n, </h1>\n] 
 */
const joinTagToElementWithN = ( tag: string ):Array<string> => {
    return [ `<${tag}>\n`, `</${tag}>\n` ];
};
/**
 * without \n
 * @param tag the tag of element
 * demo: h1 => [<h1>, </h1>] 
 */
 const joinTagToElement = ( tag: string ):Array<string> => {
    return [ `<${tag}>`, `</${tag}>` ];
};
/**
 * 用于生成template模板中的内容
 * @param content 嵌入的内容
 */
const drawDefaultHtmlTemplate = ( content: string ) => {
    const [ templateHead, templateFoot ] = joinTagToElementWithN( "template" );
    return `${templateHead}${content}${templateFoot}`;
};
/**
 * parse the sentence to the atom; 
 * then fill it to the usable component
 * demo: 
 * Button:login>@click=()=>{}, color=red, size=big;
 * => <Button>login<Button/>
 */
/** XLDCS: xld中的ComponentSentence语句 用于生成单个的组件sentence */
const compileSingleXLDCS = ( raw: string ):string => {
    // Button:login
    const [ compCore, compProps ] = raw.split( ">" );
    // Button:login
    const [ compName, compChild ] = compCore.split( ":" );
    // 之后需要把所有的属性值拼接起来 
    // 把@click=()=>{}这样的语料拆出来 然后注入进去加空格
    let propsConcated = "";
    for( const prop of compProps.split( "," ) ) {
        // 如果是针对别的语法 中间的"="需要做额外处理
        propsConcated += prop.trim();
    }
    return `<${compName} ${propsConcated}> ${compChild}</${compName}>\n`
};
const compileXLDCSs = ( xldcsRaw: string ): string => {
    const xldcsArray = xldcsRaw.split( ";" );
    return xldcsArray.reduce( ( pre, cur ) => {
        return `${pre}${cur}`;
    }, "" );
};
const drawXLDCsToTemplateNested = ( xldcsRaw: string ): string => {
    return compileXLDCSs( xldcsRaw );
};
/**
 * compile the javasript
 * export default new Vue({ data: { nested }, methods: { nested } });
 */

/** compile with nested */
const compileVueCore = ( nested: string ) => {
    const [ scriptHead, scriptFoot ] = joinTagToElementWithN( "script" );
    return `${scriptHead} export new Vue( ${ nested} ); ${scriptFoot}`;
};
 