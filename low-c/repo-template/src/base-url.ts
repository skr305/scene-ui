export type AppEnvType = "DEV" | "PRD";
const IN_ENV : AppEnvType = "DEV";
const BASE_URL : string = IN_ENV === "DEV" ? "http://localhost:9000" : "./";
export default BASE_URL; 