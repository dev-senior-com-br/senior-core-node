import RequestClient from "../base/RequestClient";
import { ClientOptions } from "../model/ClientOptions";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";

export default class Tenant {
    seniorApi: SeniorApi;
    private _client: RequestClient;

    constructor(seniorApi: SeniorApi) {
        this.seniorApi = seniorApi;
    }

    get client(): RequestClient {
        this._client = this._client || new RequestClient(this.seniorApi);
        return this._client;
    }

    getTenantByName = (tenantName: string) => {
        if (!tenantName) {
            throw new Error('O "tenantName" deve ser informado');
        }
        const clientOptions = new ClientOptions(
            "/rest/platform/tenant/queries/getTenantByName",
            HttpMethod.POST,
            {
                tenantName
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    getTenantByDomain = (tenantDomain: string) => {
        if (!tenantDomain) {
            throw new Error('O "tenantDomain" deve ser informado');
        }
        const clientOptions = new ClientOptions(
            "/rest/platform/tenant/queries/getTenantByDomain",
            HttpMethod.POST,
            {
                tenantDomain
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };
}