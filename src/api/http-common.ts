import axios from "axios";

export default axios.create({
  baseURL:
    "http://internal-nivapay-main-api-168396609.us-east-1.elb.amazonaws.com:5002",
  headers: {
    // "Content-type": "application/json",
  },
});
