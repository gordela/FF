import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/category";

function categoryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCategories() {
  return http.get(apiUrl + "/category/");
}
export function getCategory(id) {
  return http.get(apiUrl + "/category/" + id);
}

export function saveCategory(category) {
  if (category._id) {
    const body = { ...category };
    delete body._id;
    return http.put(categoryUrl(category._id), body);
  }
  return http.post(apiEndpoint, category);
}

export function deleteCategory(id) {
  return http.delete(categoryUrl(id));
}
