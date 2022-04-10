const boot = ( port: number ):string => {
    return `
const BASE_PORT = ${port};
export default BASE_PORT;
    `
};
export default boot;
