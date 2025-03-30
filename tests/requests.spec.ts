import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { sendPostRequest, sendGetRequest, sendDeleteRequest, sendUploadRequest, sendDownloadRequest } from '@/requests';

let axiosMock = new AxiosMockAdapter(axios);

describe('requests', (): void => {
  afterAll(async (): Promise<void> => {
    axiosMock.restore();
  });

  describe('post', (): void => {
    const body = { key: 'value' };

    test('sendPostRequest sends request and returns correct result, without param and token', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', body, {}).reply(200, { message: 'ok' });

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', body });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendPostRequest sends request and returns correct result, without param', async (): Promise<void> => {
      axiosMock
        .onPost('http://local.local/api/test', body, { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', body });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendPostRequest sends request and returns correct result, without token', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test/test', body, {}).reply(200, { message: 'ok' });

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', param: 'test', body });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendPostRequest sends request and returns correct result, with all', async (): Promise<void> => {
      axiosMock
        .onPost('http://local.local/api/test/test', body, { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', param: 'test', body });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendPostRequest sends request and returns correct response error', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', body, {}).reply(201, { error: 'test error' });

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', body });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ status: 201, error: 'test error' });
    });

    test('sendPostRequest sends request and returns correct network error', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', body, {}).networkError();

      const result = await sendPostRequest({ baseUrl: 'http://local.local', path: '/api/test', body });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ error: 'Request failed with error: Network Error' });
    });
  });

  describe('get', (): void => {
    test('sendGetRequest sends request and returns correct result, without param and token', async (): Promise<void> => {
      axiosMock.onGet('http://local.local/api/test', {}).reply(200, { message: 'ok' });

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendGetRequest sends request and returns correct result, without param', async (): Promise<void> => {
      axiosMock
        .onGet('http://local.local/api/test', { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendGetRequest sends request and returns correct result, without token', async (): Promise<void> => {
      axiosMock.onGet('http://local.local/api/test/test', {}).reply(200, { message: 'ok' });

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendGetRequest sends request and returns correct result, with all', async (): Promise<void> => {
      axiosMock
        .onGet('http://local.local/api/test/test', { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendGetRequest sends request and returns correct response error', async (): Promise<void> => {
      axiosMock.onGet('http://local.local/api/test', {}).reply(201, { error: 'test error' });

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ status: 201, error: 'test error' });
    });

    test('sendGetRequest sends request and returns correct network error', async (): Promise<void> => {
      axiosMock.onGet('http://local.local/api/test', {}).networkError();

      const result = await sendGetRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ error: 'Request failed with error: Network Error' });
    });
  });

  describe('delete', (): void => {
    test('sendDeleteRequest sends request and returns correct result, without param and token', async (): Promise<void> => {
      axiosMock.onDelete('http://local.local/api/test', {}).reply(200, { message: 'ok' });

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendDeleteRequest sends request and returns correct result, without param', async (): Promise<void> => {
      axiosMock
        .onDelete('http://local.local/api/test', { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendDeleteRequest sends request and returns correct result, without token', async (): Promise<void> => {
      axiosMock.onDelete('http://local.local/api/test/test', {}).reply(200, { message: 'ok' });

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendDeleteRequest sends request and returns correct result, with all', async (): Promise<void> => {
      axiosMock
        .onDelete('http://local.local/api/test/test', { headers: { Authorization: 'Bearer test', Accept: 'application/json, text/plain, */*' } })
        .reply(200, { message: 'ok' });

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendDeleteRequest sends request and returns correct response error', async (): Promise<void> => {
      axiosMock.onDelete('http://local.local/api/test', {}).reply(201, { error: 'test error' });

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ status: 201, error: 'test error' });
    });

    test('sendDeleteRequest sends request and returns correct network error', async (): Promise<void> => {
      axiosMock.onDelete('http://local.local/api/test', {}).networkError();

      const result = await sendDeleteRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ error: 'Request failed with error: Network Error' });
    });
  });

  describe('upload', (): void => {
    const data = new Uint8Array([65, 66, 67]); // ABC
    const formData: FormData = new FormData();
    formData.append('file', new Blob([data]));

    test('sendUploadRequest sends request and returns correct result, without param and token', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', formData, {}).reply(200, { message: 'ok' });

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', formData });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendUploadRequest sends request and returns correct result, without param', async (): Promise<void> => {
      axiosMock
        .onPost('http://local.local/api/test', formData, {
          headers: { Authorization: 'Bearer test', 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json, text/plain, */*' }
        })
        .reply(200, { message: 'ok' });

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', formData });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendUploadRequest sends request and returns correct result, without token', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test/test', formData, {}).reply(200, { message: 'ok' });

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', param: 'test', formData });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendUploadRequest sends request and returns correct result, with all', async (): Promise<void> => {
      axiosMock
        .onPost('http://local.local/api/test/test', formData, {
          headers: { Authorization: 'Bearer test', 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json, text/plain, */*' }
        })
        .reply(200, { message: 'ok' });

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', param: 'test', formData });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendUploadRequest sends request and returns correct result, with all, including custom mimetype', async (): Promise<void> => {
      axiosMock
        .onPost('http://local.local/api/test/test', formData, {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer test',
            'X-Mimetype': 'image/png'
          }
        })
        .reply(200, { message: 'ok' });

      const result = await sendUploadRequest({
        baseUrl: 'http://local.local',
        path: '/api/test',
        token: 'test',
        param: 'test',
        formData,
        mimetype: 'image/png'
      });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual({ message: 'ok' });
    });

    test('sendUploadRequest sends request and returns correct response error', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', formData, {}).reply(201, { error: 'test error' });

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', formData });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ status: 201, error: 'test error' });
    });

    test('sendUploadRequest sends request and returns correct network error', async (): Promise<void> => {
      axiosMock.onPost('http://local.local/api/test', formData, {}).networkError();

      const result = await sendUploadRequest({ baseUrl: 'http://local.local', path: '/api/test', formData });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ error: 'Request failed with error: Network Error' });
    });
  });

  describe('download', (): void => {
    const data = new Uint8Array([65, 66, 67]); // ABC
    const blob = new Blob([data]);

    test('sendDownloadRequest sends request and returns correct result, without param and token', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, responseType } = config;
        if (url !== 'http://local.local/api/test' || responseType !== 'blob') {
          return [404, {}];
        }
        return [200, blob];
      });

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual(blob);
    });

    test('sendDownloadRequest sends request and returns correct result, without param', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, headers, responseType } = config;
        if (url !== 'http://local.local/api/test' || responseType !== 'blob' || headers?.Authorization !== 'Bearer test') {
          return [404, {}];
        }
        return [200, blob];
      });

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual(blob);
    });

    test('sendDownloadRequest sends request and returns correct result, without token', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, responseType } = config;
        if (url !== 'http://local.local/api/test/test' || responseType !== 'blob') {
          return [404, {}];
        }
        return [200, blob];
      });

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual(blob);
    });

    test('sendDownloadRequest sends request and returns correct result, with all', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, headers, responseType } = config;
        if (url !== 'http://local.local/api/test/test' || responseType !== 'blob' || headers?.Authorization !== 'Bearer test') {
          return [404, {}];
        }
        return [200, blob];
      });

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test', token: 'test', param: 'test' });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual(blob);
    });

    test('sendDownloadRequest sends request and returns correct result, with all, including custom mimetype', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, headers, responseType } = config;
        if (
          url !== 'http://local.local/api/test/test' ||
          responseType !== 'blob' ||
          headers?.Authorization !== 'Bearer test' ||
          headers['X-Mimetype'] !== 'image/png'
        ) {
          return [404, {}];
        }
        return [200, blob];
      });

      const result = await sendDownloadRequest({
        baseUrl: 'http://local.local',
        path: '/api/test',
        token: 'test',
        param: 'test',
        mimetype: 'image/png'
      });

      expect(result.length).toBe(2);
      expect(result[0]).toBeNull();
      expect(result[1]).toEqual(blob);
    });

    test('sendDownloadRequest sends request and returns correct response error', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().reply((config) => {
        const { url, responseType } = config;
        if (url !== 'http://local.local/api/test' || responseType !== 'blob') {
          return [404, {}];
        }
        return [201, {}];
      });

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ status: 201, error: undefined });
    });

    test('sendDownloadRequest sends request and returns correct network error', async (): Promise<void> => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.onGet().networkError();

      const result = await sendDownloadRequest({ baseUrl: 'http://local.local', path: '/api/test' });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ error: 'Request failed with error: Network Error' });
    });
  });
});
