type AppResponse<T> = {
    errorCode: number,
    data: T
};
export default AppResponse;