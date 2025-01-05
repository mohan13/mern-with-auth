/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { BASE_URL } from "../config";

const fetchApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const APIAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export { fetchApi, APIAuth };
