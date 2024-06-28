import HttpClient from "./http-client.js";
export default class FetchAdapter extends HttpClient {
  async get(url) {
    const response = await fetch(url);
    return await response.json();
  }
  async post(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
  async put(url, body) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return await response.json();
  }
}
