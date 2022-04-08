import BASE_PORT from "./base-port";

export type AppEnvType = "DEV" | "PRD";
const IN_ENV : AppEnvType = "DEV";
const BASE_URL : string = IN_ENV === "DEV" ? `http://localhost:${BASE_PORT}` : "./";
export default BASE_URL; 