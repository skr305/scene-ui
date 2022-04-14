const joinTagToElementWithN = (tag) => {
    return [`<${tag}>\n`, `</${tag}>\n`];
};
const joinTagToElement = (tag) => {
    return [`<${tag}>`, `</${tag}>`];
};
const drawDefaultHtmlTemplate = (content) => {
    const [templateHead, templateFoot] = joinTagToElementWithN("template");
    return `${templateHead}${content}${templateFoot}`;
};
const compileSingleXLDCS = (raw) => {
    const [compCore, compProps] = raw.split(">");
    const [compName, compChild] = compCore.split(":");
    let propsConcated = "";
    for (const prop of compProps.split(",")) {
        propsConcated += prop.trim();
    }
    return `<${compName} ${propsConcated}> ${compChild}</${compName}>\n`;
};
const compileXLDCSs = (xldcsRaw) => {
    const xldcsArray = xldcsRaw.split(";");
    return xldcsArray.reduce((pre, cur) => {
        return `${pre}${cur}`;
    }, "");
};
const drawXLDCsToTemplateNested = (xldcsRaw) => {
    return compileXLDCSs(xldcsRaw);
};
const compileVueCore = (nested) => {
    const [scriptHead, scriptFoot] = joinTagToElementWithN("script");
    return `${scriptHead} export new Vue( ${nested} ); ${scriptFoot}`;
};
