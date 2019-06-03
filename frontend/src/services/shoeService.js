import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/shoes";

function shoeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getShoes() {
  return http.get(apiEndpoint);
}
export function deleteShoe(id) {
  return http.delete(shoeUrl(id));
}

export function getShoe(shoeId) {
  return http.get(shoeUrl(shoeId));
}

export function saveShoe(shoe) {
  if (shoe._id) {
    const body = { ...shoe };
    delete body._id;
    return http.put(shoeUrl(shoe._id), body);
  }
  return http.post(apiEndpoint, shoe);
}
