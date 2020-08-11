import { AxiosResponse } from 'axios';

export interface RequestReturn<T = any> extends AxiosResponse {
    statusCode: number,
    body: T
}