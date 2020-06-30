import {SeniorApi} from "../SeniorApi";

export class Domain {
  seniorApi: SeniorApi;
  baseUrl: string;
  constructor(seniorApi: SeniorApi) {
    this.seniorApi = seniorApi;

    this.baseUrl = seniorApi.environment;
  }
}
