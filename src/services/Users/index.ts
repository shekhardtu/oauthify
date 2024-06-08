import { fetchConfig as fetch, fetchSecureConfig } from "../axios";
import { Ilogin, IgetUsers, IcreateProfile } from "./types";
import { FetchResponse } from "src/services/axios";

class UsersService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "userProfile";
  }

  getList(): Promise<FetchResponse> {
    return fetchSecureConfig.get(`/${this.version}/${this.service}/list`);
  }

  postLogin(body: Ilogin): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/sign-in`, body);
  }

  getUserMappedOrgList(body?: Ilogin): Promise<FetchResponse> {
    return fetchSecureConfig.get(`/${this.version}/${this.service}/org/list`);
  }

  postSetPassword(body: IcreateProfile): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/set-password`, body);
  }
}

export { UsersService };
