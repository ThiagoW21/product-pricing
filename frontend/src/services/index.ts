import axios, { AxiosResponse } from "axios";

const API_BASE_URL = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export async function validateCsvData(
  payload: Array<Object>
): Promise<AxiosResponse> {
  const response = await axios.post(`${API_BASE_URL}/products/validate`, payload);

  return response;
}

export async function updateProductsPrices(
  payload: Array<Object>
): Promise<AxiosResponse>  {
  const response = await axios.put(`${API_BASE_URL}/products/update`, payload);

  return response;
}
