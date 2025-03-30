import { RequestError } from './RequestError';

type DownloadRequestResult = [RequestError] | [null, Uint8Array];

export { DownloadRequestResult };
