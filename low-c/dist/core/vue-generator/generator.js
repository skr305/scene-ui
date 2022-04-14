"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUT_PATH = exports.Status = void 0;
const base_error_1 = __importDefault(require("../error/base-error"));
const std_write_1 = require("../../util/std-write");
const json_reader_1 = __importDefault(require("../../util/json-reader"));
const parse_1 = require("./parse");
var Status;
(function (Status) {
    Status[Status["CONTINUE"] = 0] = "CONTINUE";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["UNKNOWN_ERROR"] = 99] = "UNKNOWN_ERROR";
    Status[Status["APP_ERROR"] = 100] = "APP_ERROR";
})(Status = exports.Status || (exports.Status = {}));
exports.OUT_PATH = `./x_mid_dist/vue_source`;
function vueGen(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonData = yield (0, json_reader_1.default)(path);
            let { username, date, operate } = jsonData.config;
            yield (0, std_write_1.stdMkdir)(exports.OUT_PATH);
            const VUE_FILE_PATH = `${exports.OUT_PATH}/${username}-${date.toString()}-${operate}.vue`;
            if (jsonData.VNode) {
                yield (0, std_write_1.stdWriteFileCover)(VUE_FILE_PATH, (0, parse_1.parseTemplate)(jsonData.VNode));
            }
        }
        catch (error) {
            console.error(error);
            if (error instanceof base_error_1.default) {
                return Status.APP_ERROR;
            }
            return Status.UNKNOWN_ERROR;
        }
        return Status.SUCCESS;
    });
}
exports.default = vueGen;
