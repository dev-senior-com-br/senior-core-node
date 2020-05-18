import { HttpMethod } from "../model/HttpMethod";
import RequestClient from "./RequestClient";
import SeniorApi from "../SeniorApi";

export default class Entity extends RequestClient {
    private domain: string;
    private service: string;
	private entityName: string;
	
	constructor(domain: string, service: string, entityName: string, seniorAPi: SeniorApi) {
        super(seniorAPi);
        this.domain = domain;
        this.service = service;
        this.entityName = entityName;
	}
	
	get = (filter: string = '', id : string) => {
        let url = `/rest/${this.domain}/${this.service}/entities/${this.entityName}`;
        if (id) {
            url += "/" + id;
        } else {
            if (filter) {
                url += "?filter=" + filter;
            }
        }
        const clientOptions = {
            url,
            headers: {
                authorization: `Bearer ${this.seniorApi.accessToken}`
            },
            method: HttpMethod.GET
        };
        return this.request(clientOptions);
	}
	
    post = (param: object, id: string) => {
        let url = `/rest/${this.domain}/${this.service}/entities/${this.entityName}`;
        if (id) {
            url += `/${id}`
        }
		const clientOptions = {
            url,
            headers: {
                authorization: `Bearer ${this.seniorApi.accessToken}`
            },
            method: HttpMethod.POST,
            data: param
        };
        return this.request(clientOptions);
	}
	
	put = (id: string, param: object) => {
		const clientOptions = {
            url: `/rest/${this.domain}/${this.service}/entities/${this.entityName}/${id}`,
            headers: {
                authorization: `Bearer ${this.seniorApi.accessToken}`
            },
            method: HttpMethod.PUT,
            data: param
        };
        return this.request(clientOptions);
	}
	
	patch = (id: string, param: object) => {
		const clientOptions = {
            url: `/rest/${this.domain}/${this.service}/entities/${this.entityName}/${id}`,
            headers: {
                authorization: `Bearer ${this.seniorApi.accessToken}`
            },
            method: HttpMethod.PATCH,
            data: param
        };
        return this.request(clientOptions);
	}
	
	delete = (id: string) => {
        const clientOptions = {
            url: `/rest/${this.domain}/${this.service}/entities/${this.entityName}/${id}`,
            headers: {
                authorization: `Bearer ${this.seniorApi.accessToken}`
            },
            method: HttpMethod.DELETE
        };
        return this.request(clientOptions);
	}
}