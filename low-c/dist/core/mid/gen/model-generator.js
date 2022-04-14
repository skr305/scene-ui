"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const drawOutposeSentence = (key, outposeType, isLast = false, notNull = true) => {
    return ` 
    ${key} ${constants_1.MODEL_OUTPOSE_MAPS[outposeType].dbType} ${notNull ? "not null" : ""} ${isLast ? "" : ","}
     `;
};
const drawPrimayKeySentence = (primarys, needComma = false) => {
    let NESTED = "";
    primarys.forEach((key, idx) => {
        NESTED += idx === primarys.length - 1 ? `${key} ` : ` ${key}, `;
    });
    return `
    primary key ( ${NESTED} ) ${needComma ? "," : ""}
    `;
};
const modelGenerator = (config) => {
    const BASE_NAME = config[constants_1.MODEL_DATABASE_KEY];
    let GENED = `
${(config === null || config === void 0 ? void 0 : config.$Cover) ? `drop database \`${BASE_NAME}\`;` : ""}
create database \`${BASE_NAME}\`;
use \`${BASE_NAME}\`;
    `;
    const tables = config.tables;
    if (!tables) {
        return GENED;
    }
    Object.keys(tables).map((tn) => {
        let NESTED = "";
        if (tn != constants_1.MODEL_DATABASE_KEY) {
            const meta = tables[tn];
            let primaryID = [];
            const sections = Object.keys(meta);
            sections.map((secKey, idx) => {
                const secInfo = meta[secKey];
                if (secInfo.isID !== undefined) {
                    if (secInfo.isID) {
                        primaryID.push(secKey);
                    }
                    const isLast = idx === sections.length - 1 && !primaryID.length;
                    NESTED += drawOutposeSentence(secKey, secInfo.type, isLast);
                }
                else {
                    const isLast = idx === sections.length - 1 && !primaryID.length;
                    NESTED += drawOutposeSentence(secKey, meta[secKey], isLast);
                }
            });
            NESTED += drawPrimayKeySentence(primaryID);
        }
        GENED += `
create table \`${tn}\` (
    ${NESTED}
);
        `;
    });
    return GENED;
};
exports.default = modelGenerator;
