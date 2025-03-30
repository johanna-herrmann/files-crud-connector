import { RequestAttributes } from './RequestAttributes';
import { Body } from './Body';

interface PostRequestAttributes extends RequestAttributes {
  body: Body;
}

export { PostRequestAttributes };
