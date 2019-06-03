import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bag";

export function add(id) {
  return http.get(apiEndpoint + "/" + id);
}

export default {
  add
};
