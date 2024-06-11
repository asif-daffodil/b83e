/// <reference types="node" />
/// <reference types="node" />
import { ServerResponse as Response, IncomingMessage } from 'http';
import { EventEmitter } from 'events';
type NextFunction = (err?: any) => void;
export type ReqWithBody<T = any> = IncomingMessage & {
    body?: T;
} & EventEmitter;
export declare const hasBody: (method: string) => boolean;
export declare const p: <T = any>(fn: (body: any) => any) => (req: ReqWithBody<T>, _res: Response, next: (err?: any) => void) => Promise<any>;
declare const custom: <T = any>(fn: (body: any) => any) => (req: ReqWithBody, _res: Response, next: NextFunction) => Promise<void>;
declare const json: () => (req: ReqWithBody, res: Response, next: NextFunction) => Promise<void>;
declare const raw: () => (req: ReqWithBody, _res: Response, next: NextFunction) => Promise<void>;
declare const text: () => (req: ReqWithBody, _res: Response, next: NextFunction) => Promise<void>;
declare const urlencoded: () => (req: ReqWithBody, res: Response, next: NextFunction) => Promise<void>;
export { custom, json, raw, text, urlencoded };
