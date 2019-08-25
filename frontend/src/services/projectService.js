import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/project";

function projectUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProjects() {
  return http.get(apiEndpoint);
}
export function deleteProject(id) {
  return http.delete(projectUrl(id));
}

export function getProject(projectId) {
  return http.get(projectUrl(projectId));
}

export function saveProject(project) {
  if (project._id) {
    const body = { ...project };
    delete body._id;
    return http.put(projectUrl(project._id), body);
  }
  return http.post(apiEndpoint, project);
}
