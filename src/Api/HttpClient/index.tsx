import axios from "axios";
import { currencyExchangeApiKey } from "../../constants/apiKeys";

export class HttpClient {
  baseUrl;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get(url: string) {
    return await axios.get(`${this.baseUrl}/${url}`, {
      headers: {
        apikey: currencyExchangeApiKey,
      },
    });
  }

  async post(url: string, body: object) {
    return await axios.post(`${this.baseUrl}/${url}`, body, {
      headers: {
        apikey: currencyExchangeApiKey,
      },
    });
  }

  async put(url: string, id: number | string, body: object) {
    return await axios.put(`${this.baseUrl}/${url}/${id}`, body, {
      headers: {
        apikey: currencyExchangeApiKey,
      },
    });
  }

  async delete(url: string, id: number | string) {
    return await axios.delete(`${this.baseUrl}/${url}/${id}`, {
      headers: {
        apikey: currencyExchangeApiKey,
      },
    });
  }
}
