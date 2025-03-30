import { RequestError } from './RequestError';
import { Body } from './Body';

type RequestResult = [RequestError] | [null, Body];

export { RequestResult };
