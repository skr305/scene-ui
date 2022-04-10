export const setSession = <T>( item: string, data: T ) => {
    sessionStorage.setItem( item, JSON.stringify( data ) );
};
export const getSession = <T>( item: string ): T | null => {
    const stringfied = sessionStorage.getItem( item );
    return stringfied === null ? stringfied : JSON.parse( stringfied ) as T;
};
export const setLocal = <T>( item: string, data: T ) => {
    localStorage.setItem( item, JSON.stringify( data ) );
};
export const getLocal = <T>( item: string ): T | null => {
    const stringfied = localStorage.getItem( item );
    return stringfied === null ? stringfied : JSON.parse( stringfied ) as T;
};