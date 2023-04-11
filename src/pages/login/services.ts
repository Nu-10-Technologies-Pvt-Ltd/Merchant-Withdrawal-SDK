import { handleApiError, Result } from "../../utils";

import apiClient from "../../api/http-common2";
import { LOGIN } from "../../api/endpoints";

const LoginUser = async (userCredentials: any): Promise<any> => {
  try {
    const response = await apiClient.post(`${LOGIN}`, userCredentials);
    // const response: any = await fetch(
    //   `http://nivapay-main-api-lb2-77118926.us-east-1.elb.amazonaws.com:3000/api/auth/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       // Accept: "application/json",
    //       // "Content-Type": "application/json",
    //       // Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(userCredentials),
    //   }
    // )
    //   .then((res: { json: () => any }) => res.json())
    //   .then((result: any) => {
    //     if (result) {
    //       console.log(result);
    //     }
    //   });

    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default LoginUser;
