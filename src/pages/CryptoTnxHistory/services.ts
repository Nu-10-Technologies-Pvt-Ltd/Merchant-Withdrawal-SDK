import { handleApiError, Result } from "../../utils";
import apiClient from "../../api/http-common3";
import { TXN_HISTORY } from "../../api/endpoints";
// import { useGlobalContext } from "../../context/context";

const getTxnHistory = async (token: any): Promise<any> => {
  try {
    const response = await apiClient.get(`${TXN_HISTORY}/${token}`, {
      //   params: { currency },
      // headers: { Authorization: `Bearer ${userToken}` },
    });

    const { data } = response;
    return Result.success(data);
  } catch (e) {
    return handleApiError(e);
  }
};

export default getTxnHistory;
