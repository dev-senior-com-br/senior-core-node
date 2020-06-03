import RequestClient from "../base/RequestClient";
import { ClientOptions } from "../model/ClientOptions";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";

export default class Tenant extends RequestClient {
    constructor(seniorApi: SeniorApi) {
        super(seniorApi, "platform", "tenant");
    }

    getTenantByName = (tenantName: string) => {
        if (!tenantName) {
            throw new Error('O "tenantName" deve ser informado');
        }
        const clientOptions = {
            url: this.getUrlPath("queries/getTenantByName"),
            method: HttpMethod.POST,
            data: {
                tenantName
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    };

    getTenantByDomain = (tenantDomain: string) => {
        if (!tenantDomain) {
            throw new Error('O "tenantDomain" deve ser informado');
        }
        const clientOptions = {
            url: this.getUrlPath("queries/getTenantByDomain"),
            method: HttpMethod.POST,
            data: {
                tenantDomain
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    };
}