import { RequestAttributes } from './RequestAttributes';

interface DownloadRequestAttributes extends RequestAttributes {
  mimetype?: string;
}

export { DownloadRequestAttributes };
