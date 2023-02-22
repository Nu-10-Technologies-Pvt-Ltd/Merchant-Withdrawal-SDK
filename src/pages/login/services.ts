import { handleApiError, Result } from "../../utils";
import apiClient from "../../api/http-common";
import { LOGIN } from "../../api/endpoints";

const LoginUser = async (userCredentials: any): Promise<any> => {
  try {
    const response = await apiClient.post(`${LOGIN}`, userCredentials);

    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default LoginUser;
