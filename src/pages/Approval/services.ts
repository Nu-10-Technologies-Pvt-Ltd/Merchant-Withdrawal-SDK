import { handleApiError, Result } from "../../utils";
import apiClient from "../../api/http-common";
import { SUBMIT_DATA } from "../../api/endpoints";

const sendCrypto = async (cryptoData: any): Promise<any> => {
  try {
    const response = await apiClient.post(`${SUBMIT_DATA}`, cryptoData);

    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default sendCrypto;
