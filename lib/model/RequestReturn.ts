import { AxiosResponse } from 'axios';

export interface RequestReturn<T> extends AxiosResponse {
    statusCode: number,
    body: T
}