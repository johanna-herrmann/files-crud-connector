import { RequestError } from './RequestError';

type DownloadRequestResult = [RequestError] | [null, Blob];

export { DownloadRequestResult };
