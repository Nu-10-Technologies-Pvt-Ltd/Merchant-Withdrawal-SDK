import axios from "axios";

export default axios.create({
  baseURL:
    "http://nivapay-main-api-lb2-77118926.us-east-1.elb.amazonaws.com:5002",
  headers: {
    // "Content-type": "application/json",
  },
});
