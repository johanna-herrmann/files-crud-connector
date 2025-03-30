import axios from 'axios';
import { RequestAttributes } from '@/types/RequestAttributes';
import { PostRequestAttributes } from '@/types/PostRequestAttributes';
import { RequestResult } from '@/types/RequestResult';
import { DownloadRequestResult } from '@/types/DownloadRequestResult';
import { UploadRequestAttributes } from '@/types/UploadRequestAttributes';
import { DownloadRequestAttributes } from '@/types/DownloadRequestAttributes';

type Method = 'get' | 'post' | 'delete';
type Attributes = RequestAttributes | PostRequestAttributes | UploadRequestAttributes;

const removeLeadingAndTrailingSlashes = function (value: string): string {
  return value.replace(/(^\/+|\/+$)/, '');
};

const resolveUrl = function (baseUrl: string, path: string, param: string | undefined): string {
  const paramGiven = param && removeLeadingAndTrailingSlashes(param.trim()).length > 0;
  const paramPart = paramGiven ? `/${removeLeadingAndTrailingSlashes(param)}` : '';
  return `${removeLeadingAndTrailingSlashes(baseUrl)}/${removeLeadingAndTrailingSlashes(path)}${paramPart}`;
};

const sendRequest = async function (method: Method, attributes: Attributes): Promise<RequestResult> {
  const { baseUrl, path, param, token } = attributes;
  const body = 'body' in attributes ? attributes.body : undefined;
  const formData = 'formData' in attributes ? attributes.formData : undefined;
  const mimetype = 'mimetype' in attributes ? attributes.mimetype : undefined;
  try {
    const url = resolveUrl(baseUrl, path, param);
    const config: axios.AxiosRequestConfig = { headers: {} };
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (mimetype && config.headers) {
      config.headers['X-Mimetype'] = mimetype;
    }
    const dataToSend = body ?? formData ?? {};
    const result = method === 'post' ? await axios.post(url, dataToSend, config) : await axios[method](url, config);
    const { status, data } = result;
    if (status !== 200) {
      return [{ status, error: data.error as string }];
    }
    return [null, data];
  } catch (ex: unknown) {
    return [{ error: `Request failed with error: ${(ex as Error).message}` }];
  }
};

const sendUploadRequest = async function (attributes: UploadRequestAttributes): Promise<RequestResult> {
  return await sendRequest('post', attributes);
};

const sendPostRequest = async function (attributes: PostRequestAttributes): Promise<RequestResult> {
  return await sendRequest('post', attributes);
};

const sendGetRequest = async function (attributes: RequestAttributes): Promise<RequestResult> {
  return await sendRequest('get', attributes);
};

const sendDeleteRequest = async function (attributes: RequestAttributes): Promise<RequestResult> {
  return await sendRequest('delete', attributes);
};

const sendDownloadRequest = async function (attributes: DownloadRequestAttributes): Promise<DownloadRequestResult> {
  const { baseUrl, path, param, token, mimetype } = attributes;
  try {
    const url = resolveUrl(baseUrl, path, param);
    const config: axios.AxiosRequestConfig = { headers: {}, responseType: 'arraybuffer' };
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (mimetype && config.headers) {
      config.headers['X-Mimetype'] = mimetype;
    }
    const result = await axios.get(url, config);
    const { status, data } = result;
    if (status !== 200) {
      return [{ status, error: data.error as string }];
    }
    return [null, new Uint8Array(data as ArrayBuffer)];
  } catch (ex: unknown) {
    return [{ error: `Request failed with error: ${(ex as Error).message}` }];
  }
};

export { sendPostRequest, sendGetRequest, sendDeleteRequest, sendUploadRequest, sendDownloadRequest };
