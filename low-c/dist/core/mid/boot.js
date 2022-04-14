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
exports.BootGen = exports.DEFAULT_DIST_PATH = exports.DIS_DIR_NAME = exports.MidGeneratorStatus = void 0;
const base_error_1 = __importDefault(require("../error/base-error"));
const json_reader_1 = __importDefault(require("../../util/json-reader"));
const model_generator_1 = __importDefault(require("./gen/model-generator"));
const std_write_1 = require("../../util/std-write");
var MidGeneratorStatus;
(function (MidGeneratorStatus) {
    MidGeneratorStatus[MidGeneratorStatus["SUC"] = 0] = "SUC";
    MidGeneratorStatus[MidGeneratorStatus["BAD_PATH"] = 1] = "BAD_PATH";
    MidGeneratorStatus[MidGeneratorStatus["UNKNOWN_ERROR"] = 99] = "UNKNOWN_ERROR";
    MidGeneratorStatus[MidGeneratorStatus["APP_ERROR"] = 100] = "APP_ERROR";
})(MidGeneratorStatus = exports.MidGeneratorStatus || (exports.MidGeneratorStatus = {}));
;
exports.DIS_DIR_NAME = "x_mid_dist";
exports.DEFAULT_DIST_PATH = `./${exports.DIS_DIR_NAME}`;
const DEFAULT_MIDG_OPTIONS = {
    output: exports.DEFAULT_DIST_PATH
};
const BootGen = (path, options = DEFAULT_MIDG_OPTIONS) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configBody = yield (0, json_reader_1.default)(path);
        const OUT_DIR = options.output;
        yield (0, std_write_1.stdMkdir)(OUT_DIR);
        const APP_NAME = configBody.AppName;
        const MODEL_SQL_OUTPATH = `${OUT_DIR}/${APP_NAME}-database.sql`;
        if (configBody.Model) {
            yield (0, std_write_1.stdWriteFileCover)(MODEL_SQL_OUTPATH, yield (0, model_generator_1.default)(configBody.Model));
        }
    }
    catch (error) {
        if (error instanceof base_error_1.default) {
            return MidGeneratorStatus.APP_ERROR;
        }
        console.error(error);
        return MidGeneratorStatus.UNKNOWN_ERROR;
    }
    return MidGeneratorStatus.SUC;
});
exports.BootGen = BootGen;
exports.default = exports.BootGen;
