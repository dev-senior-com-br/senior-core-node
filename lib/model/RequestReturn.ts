import { AxiosResponse } from 'axios';

export interface RequestReturn<T = any> extends AxiosResponse<T> {
    statusCode: number,
    body: T
}