import { describe, expect, it, test, vi } from 'vitest';
import { HttpClient } from './http-client';

const mockData = { message: 'test data' };

describe('HTTPClient', () => {
  it('Should HttpClient.get fetches data and parses JSON', async () => {
    const url = 'https://api.example.com/data';
    const mockFetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(mockData)));
    global.fetch = mockFetch;

    const httpClient = new HttpClient();
    const data = await httpClient.get(url);

    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(data).toEqual(mockData);
  });

  it('Should HttpClient.post sends data as JSON', async () => {
    const url = 'https://api.example.com/data';
    const data = { message: 'test data' };
    const mockFetch = vi.fn().mockResolvedValueOnce(new Response());
    global.fetch = mockFetch;

    const httpClient = new HttpClient();
    await httpClient.post(url, data);

    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  });

  it('Should HttpClient.put sends data as JSON', async () => {
    const url = 'https://api.example.com/data';
    const data = { message: 'test data' };
    const mockFetch = vi.fn().mockResolvedValueOnce(new Response());
    global.fetch = mockFetch;

    const httpClient = new HttpClient();
    await httpClient.put(url, data);

    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  });

  it('Should HttpClient.delete sends a DELETE request', async () => {
    const url = 'https://api.example.com/data';
    const mockFetch = vi.fn().mockResolvedValueOnce(new Response());
    global.fetch = mockFetch;

    const httpClient = new HttpClient();
    await httpClient.delete(url);

    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  });
})
