/// <reference types="node" />
import { ParsedUrlQuery } from 'node:querystring';
type Regex = {
    keys: string[] | false;
    pattern: RegExp;
};
export declare const getURLParams: ({ pattern, keys }: Regex, reqUrl?: string) => URLParams;
export type URLParams = {
    [key: string]: string;
};
export declare const getPathname: (url: string) => string;
export declare const getQueryParams: (url?: string) => ParsedUrlQuery;
export {};
//# sourceMappingURL=index.d.ts.map