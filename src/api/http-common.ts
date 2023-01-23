import axios from "axios";

export default axios.create({
  baseURL: "http://10.0.21.149:5002",
  headers: {
    // "Content-type": "application/json",
  },
});
