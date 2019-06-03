import { apiUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/user/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return {
      bag: {}
    };
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAdmin() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user.isAdmin;
  } catch (error) {
    return false;
  }
}

export default {
  login,
  getJwt,
  logout,
  getCurrentUser,
  loginWithJwt,
  isAdmin
};
