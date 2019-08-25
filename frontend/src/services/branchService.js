import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/branch";

function branchUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getBranches() {
  return http.get(apiEndpoint);
}

export function saveBranch(branch) {
  if (branch._id) {
    const body = { ...branch };
    delete body._id;
    return http.put(branchUrl(branch._id), body);
  }
  return http.post(apiEndpoint, branch);
}

export function deleteBranch(id) {
  return http.delete(branchUrl(id));
}
