import { handleApiError, Result } from "../../utils";
import apiClient from "../../api/http-common";
import { TXN_HISTORY } from "../../api/endpoints";

const sendCrypto = async (cryptoData: any): Promise<any> => {
  try {
    const response = await apiClient.post(`${TXN_HISTORY}`, cryptoData);

    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default sendCrypto;
