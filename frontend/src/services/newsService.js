import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/news";

function newsUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getNews() {
  return http.get(apiEndpoint);
}
export function deleteNews(id) {
  return http.delete(newsUrl(id));
}

export function getNew(newsId) {
  return http.get(newsUrl(newsId));
}

export function saveNews(news) {
  if (news._id) {
    const body = { ...news };
    delete body._id;
    return http.put(newsUrl(news._id), body);
  }
  return http.post(apiEndpoint, news);
}
