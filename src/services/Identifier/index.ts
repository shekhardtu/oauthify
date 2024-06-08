import { fetchConfig as fetch } from "../axios";

import { IdentifierType, VerifyOtpType } from "./types";
import { FetchResponse } from "src/services/axios";

class IdentifierService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "identifier";
  }

  postSendOtp(body: IdentifierType): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/send-otp`, body);
  }

  postVerifyOtp(body: VerifyOtpType): Promise<FetchResponse> {
    return fetch.post(`/${this.version}/${this.service}/verify-otp`, body);
  }
}

export { IdentifierService };
