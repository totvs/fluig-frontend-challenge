import HttpClient from "./http-client.js";

describe("HttpClient", () => {
  it("should be defined", () => {
    const httpClient = new HttpClient();
    expect(httpClient).toBeDefined();
  });

  it("should be implemented", () => {
    const httpClient = new HttpClient();
    expect(httpClient.get).toBeDefined();
    expect(httpClient.post).toBeDefined();
    expect(httpClient.put).toBeDefined();
    expect(httpClient.delete).toBeDefined();
  });

  it("should throw an error", () => {
    const httpClient = new HttpClient();
    expect(httpClient.get).toThrow(
      new Error("Method 'get' must be implemented.")
    );
    expect(httpClient.post).toThrow(
      new Error("Method 'post' must be implemented.")
    );
    expect(httpClient.put).toThrow(
      new Error("Method 'put' must be implemented.")
    );
    expect(httpClient.delete).toThrow(
      new Error("Method 'delete' must be implemented.")
    );
  });
});
