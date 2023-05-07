import { HTTPTransport } from "../services/HTTPTransport";
import { RESOURCE_ENDPOINTS } from "./endpoints";

class ResourceApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/resources");
  }

  upload(file: File): Promise<Response> {
    const tmp = new FormData();
    tmp.append("resource", file);
    return this.http.post(RESOURCE_ENDPOINTS.UPLOAD, tmp);
  }
}

export default new ResourceApi();
