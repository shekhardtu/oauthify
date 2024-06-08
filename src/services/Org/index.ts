import { fetchConfig as fetch, fetchSecureConfig } from "../axios";
import { IputJobApplication, IapplyJob, IgetUsers } from "./types";
import { FetchResponse } from "src/services/axios";
import { objectToQueryParam } from "helpers/lib/utils";

class OrgService {
  version: string;
  baseUrl: string;
  service: string;

  constructor(baseUrl: string, version: string = "v1") {
    this.version = version;
    this.baseUrl = baseUrl;
    this.service = "org";
  }

  getRecord(body: any): Promise<FetchResponse> {
    const { id } = body;
    return fetchSecureConfig.get(`/${this.version}/${this.service}/${id}`);
  }

  getList(params?: any): Promise<FetchResponse> {
    const queryParam = objectToQueryParam(params);
    return fetchSecureConfig.get(
      `/${this.version}/${this.service}/list?${queryParam}`
    );
  }

  patchRecord(body: IputJobApplication): Promise<FetchResponse> {
    const { id } = body;

    return fetchSecureConfig.patch(
      `/${this.version}/${this.service}/${id}`,
      body
    );
  }

  deleteRecord(body: any): Promise<FetchResponse> {
    const { id } = body;
    return fetchSecureConfig.delete(`/${this.version}/${this.service}/${id}`);
  }

  postRecord(body: IapplyJob): Promise<FetchResponse> {
    return fetchSecureConfig.post(`/${this.version}/${this.service}/`, body);
  }
}

export { OrgService };
