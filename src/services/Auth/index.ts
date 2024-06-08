import { fetchConfig as fetch } from "../axios";

import { IsignUp, IcreateProfile } from "./types";
import { LoginFormInterface } from "src/components/AuthCheck/hooks/useLoginMethods.types";
import { FetchResponse } from "../axios";

class AuthService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "auth";
  }

  postSignUp(body: IsignUp): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/sign-up`, body);
  }

  postLogin(body: LoginFormInterface): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/sign-in`, body);
  }

  postSetPassword(body: IcreateProfile): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/set-password`, body);
  }

  postSocialLogin(body: any): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/social-sign-in`, body);
  }
}

export { AuthService };
