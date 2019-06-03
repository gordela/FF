import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/styles";

function styleUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getStyles() {
  return http.get(apiUrl + "/styles/");
}
export function getStyle(id) {
  return http.get(apiUrl + "/styles/" + id);
}

export function saveStyle(style) {
  if (style._id) {
    const body = { ...style };
    delete body._id;
    return http.put(styleUrl(style._id), body);
  }
  return http.post(apiEndpoint, style);
}

export function deleteStyle(id) {
  return http.delete(styleUrl(id));
}
