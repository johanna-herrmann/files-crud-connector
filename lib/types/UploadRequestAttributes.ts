import { RequestAttributes } from './RequestAttributes';

interface UploadRequestAttributes extends RequestAttributes {
  formData: FormData;
  mimetype?: string;
}

export { UploadRequestAttributes };
