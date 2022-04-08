import axios, { AxiosResponse } from 'axios';
import ServerError from '../server/server-error';
import BASE_URL from './base-url';
import { getSession } from './util/storage';
import TOKEN_SESSION_ITEM from './token-session-item';

export const post = async <P, R>( options: { payload: P, url: string }  ):Promise< ServerError<R> > => {
    const { url, payload } = options;
    return axios.create( { baseURL: BASE_URL } ).post< ServerError<R> >( url, {
        headers: {
            // application/x-www-form-urlencoded
            "Content-Type": "application/x-www-form-urlencoded",
            "token": getSession( TOKEN_SESSION_ITEM ) as string
        },
        data: payload,
        transformRequest: [
            function( data: any ) {
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }
        ]
    } ).then( ( response: AxiosResponse<ServerError<R>, any> ) => {
        return response.data;
    } );
};