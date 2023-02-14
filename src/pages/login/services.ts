import { handleApiError, Result } from "../../utils";
import apiClient from "../../api/http-common";
import { LOGIN } from "../../api/endpoints";

const LoginUser = async (userCredentials: any): Promise<any> => {
  try {
    // const response = await apiClient.post(`${LOGIN}`, userCredentials);
    const response = await fetch(
      "http://nivapay-main-api-lb2-77118926.us-east-1.elb.amazonaws.com:3000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userCredentials,
      }
    );
    const json = await response.json();
    const { data } = json;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default LoginUser;
