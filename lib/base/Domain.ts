import SeniorApi from "../SeniorApi";

export default class Domain {
  seniorApi: SeniorApi;
  baseUrl: string;
  constructor(seniorApi: SeniorApi) {
    this.seniorApi = seniorApi;

    this.baseUrl =
      "https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0";
  }
}
