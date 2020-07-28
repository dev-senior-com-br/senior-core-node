import { AxiosResponse } from 'axios';

export interface RequestReturn extends AxiosResponse {
    statusCode: number,
    body: any
}