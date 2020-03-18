import RequestClient from "../base/RequestClient";
import { ClientOptions } from "../model/ClientOptions";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";
import { Pagination } from "../model/Pagination";
import { Properties } from "../model/Properties";

export default class Users {
    seniorApi: SeniorApi;
    private _client: RequestClient;

    constructor(seniorApi: SeniorApi) {
        this.seniorApi = seniorApi;
    }

    get client(): RequestClient {
        this._client = this._client || new RequestClient(this.seniorApi);
        return this._client;
    }

    listGroups = (searchValue: string, tenant: string, pagination: Pagination) => {
        if (!searchValue) {
            throw new Error('O "searchValue" deve ser informado');
        }

        if (!tenant) {
            throw new Error('O "tenant" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/queries/listGroups",
            HttpMethod.POST,
            {
                searchValue,
                tenant,
                pagination
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    listGroupUsers = (id: string, searchValue: string, pagination: Pagination) => {
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        if (!searchValue) {
            throw new Error('O "searchValue" deve ser informado');
        }
        const clientOptions = new ClientOptions(
            "/rest/platform/user/queries/listGroupUsers",
            HttpMethod.POST,
            {
                id,
                searchValue,
                pagination
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    getGroup = (id: string) => {
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }
        const clientOptions = new ClientOptions(
            "/rest/platform/user/queries/getGroup",
            HttpMethod.POST,
            {
                id
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    getUser = (username: string) => {
        if (!username) {
            throw new Error('O "username" deve ser informado');
        }
        const clientOptions = new ClientOptions(
            "/rest/platform/user/queries/getUser",
            HttpMethod.POST,
            {
                username
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    createGroup = (name: string, description: string, email: string, users: string[]) => {
        if (!name) {
            throw new Error('O "tenantName" deve ser informado');
        }

        if (!description) {
            throw new Error('O "tenantName" deve ser informado');
        }

        if (!email) {
            throw new Error('O "tenantName" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/actions/createGroup",
            HttpMethod.POST,
            {
                name,
                description,
                email,
                users
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    updateGroup = (id: string, name: string, description: string, email: string, usersToAdd: string[], usersToRemove: string[]) => {

        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        if (!name) {
            throw new Error('O "name" deve ser informado');
        }

        if (!description) {
            throw new Error('O "description" deve ser informado');
        }

        if (!email) {
            throw new Error('O "email" deve ser informado');
        }

        if ((!usersToAdd && !usersToRemove) || (usersToAdd.length < 1 && usersToRemove.length < 1)) {
            throw new Error('O "usersToAdd" ou "usersToRemove" devem ser informados');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/actions/updateGroup",
            HttpMethod.POST,
            {
                id,
                name,
                description,
                email,
                usersToAdd,
                usersToRemove
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    createUser = (username: string, fullName: string, email: string, password: string, description: string, blocked: boolean, changePassword: boolean, photo: string, locale: string, properties: Properties[]) => {
        if (!username) {
            throw new Error('O "username" deve ser informado');
        }

        if (!fullName) {
            throw new Error('O "fullName" deve ser informado');
        }

        if (!email) {
            throw new Error('O "email" deve ser informado');
        }

        if (!password) {
            throw new Error('O "password" deve ser informado');
        }

        if (!description) {
            throw new Error('O "description" deve ser informado');
        }

        if (!locale) {
            throw new Error('O "locale" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/actions/createUser",
            HttpMethod.POST,
            {
                username,
                fullName,
                email,
                password,
                description,
                blocked,
                changePassword,
                photo,
                locale,
                properties
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    updateUser = (username: string, fullName: string, email: string, password: string, description: string, blocked: boolean, changePassword: boolean, photo: string, locale: string, properties: Properties[]) => {
        if (!username) {
            throw new Error('O "username" deve ser informado');
        }

        if (!fullName) {
            throw new Error('O "fullName" deve ser informado');
        }

        if (!email) {
            throw new Error('O "email" deve ser informado');
        }

        if (!password) {
            throw new Error('O "password" deve ser informado');
        }

        if (!description) {
            throw new Error('O "description" deve ser informado');
        }

        if (!locale) {
            throw new Error('O "locale" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/actions/updateUser",
            HttpMethod.POST,
            {
                username,
                fullName,
                email,
                password,
                description,
                blocked,
                changePassword,
                photo,
                locale,
                properties
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    updateGroupUsers = (usersToAdd: string[], usersToRemove: string[], groupId: string) => {
        if (!usersToAdd && !usersToRemove) {
            throw new Error('O "usersToAdd" e/ou "usersToRemove" devem ser informados.');
        }

        if (!groupId) {
            throw new Error('O "groupId" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/platform/user/actions/updateGroupUsers",
            HttpMethod.POST,
            {
                usersToAdd,
                usersToRemove,
                groupId
            }
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

    deleteGroup = (id: string) => {
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        const clientOptions = new ClientOptions(
            "/rest/usuarios/userManager/entities/Grupo/" + id,
            HttpMethod.DELETE
        );
        clientOptions.accessToken = this.seniorApi.accessToken;
        return this.client.request(clientOptions);
    };

}