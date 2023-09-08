import axios from "axios";
import { IProduct } from "../interfaces";

const API_BASE_URL = `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export async function validateCsvData(
  data: Array<Object>
): Promise<Array<IProduct>> {
  const response = await axios.post(`${API_BASE_URL}/products/validate`, data);

  return response.data;
}

export async function updateProductsPrices(
  payload: Array<Object>
): Promise<Array<IProduct>> {
  const response = await axios.put(`${API_BASE_URL}/products/update`, payload);

  return response.data;
}
