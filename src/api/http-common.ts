import axios from "axios";
import config from "../setupconfig.json"

const http = axios.create({
  baseURL: config.api_url,
  headers: config.headers,
});

export default http