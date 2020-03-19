import RequestClient from "../base/RequestClient";
import { HttpMethod } from "../model/HttpMethod";
import SeniorApi from "../SeniorApi";
import { Pagination } from "../model/Pagination";
import { Properties } from "../model/Properties";

export default class Users extends RequestClient {
    
    private _client: RequestClient;

    constructor(seniorApi: SeniorApi) {
        super(seniorApi);
    }

    listGroups = (searchValue: string, tenant: string, pagination: Pagination) => {
        if (!searchValue) {
            throw new Error('O "searchValue" deve ser informado');
        }

        if (!tenant) {
            throw new Error('O "tenant" deve ser informado');
        }

        const clientOptions = {
            url: "/rest/platform/user/queries/listGroups",
            method: HttpMethod.POST,
            data: {
               searchValue,
                tenant,
                pagination
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    };

    listGroupUsers = (id: string, searchValue: string, pagination: Pagination) => {
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        if (!searchValue) {
            throw new Error('O "searchValue" deve ser informado');
        }

        const clientOptions = {
            url: "/rest/platform/user/queries/listGroupUsers",
            method: HttpMethod.POST,
            data: {
                id,
                searchValue,
                pagination
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    };  


    getGroup = (id: string) => {
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        const clientOptions = {
            url:  "/rest/platform/user/queries/getGroup",
            method: HttpMethod.POST,
            data: {
                id
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    };  


    getUser = (username: string) => {

        if (!username) {
            throw new Error('O "username" deve ser informado');
        }

        const clientOptions = {
            url: "/rest/platform/user/queries/getUser",
            method: HttpMethod.POST,
            data: {
                username
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    }; 



    createGroup =  (name: string, description: string, email: string, users: string[]) => {

        if (!name) {
            throw new Error('O "tenantName" deve ser informado');
        }

        if (!description) {
            throw new Error('O "tenantName" deve ser informado');
        }

        if (!email) {
            throw new Error('O "tenantName" deve ser informado');
        }

        const clientOptions = {
            url: "/rest/platform/user/actions/createGroup",
            method: HttpMethod.POST,
            data: {
                name,
                description,
                email,
                users
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
    }; 

    updateGroup =  (id: string, name: string, description: string, email: string, usersToAdd: string[], usersToRemove: string[]) => {

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

        const clientOptions = {
            url: "/rest/platform/user/actions/updateGroup",
            method: HttpMethod.POST,
            data: {
                id,
                name,
                description,
                email,
                usersToAdd,
                usersToRemove
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);
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

        const clientOptions = {
            url: "/rest/platform/user/actions/createUser",
            method: HttpMethod.POST,
            data: {
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
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        return this.request(clientOptions);       
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

        const clientOptions = {
            url:  "/rest/platform/user/actions/updateUser",
            method: HttpMethod.POST,
            data: {
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
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };

        return this.request(clientOptions);       
    };

    updateGroupUsers = (usersToAdd: string[], usersToRemove: string[], groupId: string) => {

        if (!usersToAdd && !usersToRemove) {
            throw new Error('O "usersToAdd" e/ou "usersToRemove" devem ser informados.');
        }

        if (!groupId) {
            throw new Error('O "groupId" deve ser informado');
        }


        const clientOptions = {
            url:  "/rest/platform/user/actions/updateGroupUsers",
            method: HttpMethod.POST,
            data: {
                usersToAdd,
                usersToRemove,
                groupId
            },
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };

        return this.request(clientOptions);  

    };

    deleteGroup = (id: string) => {
        
        if (!id) {
            throw new Error('O "id" deve ser informado');
        }

        const clientOptions = {
            url:  "/rest/usuarios/userManager/entities/Grupo/" + id,
            method: HttpMethod.DELETE,
            headers: {
                authorization: this.seniorApi.accessToken
            }
        };
        
        return this.request(clientOptions);  

    };



    

}