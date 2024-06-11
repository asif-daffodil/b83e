export type NextFunction = (err?: any) => void;
export type SyncHandler<Request = any, Response = any> = (req: Request, res: Response, next: NextFunction) => void;
export type AsyncHandler<Request = any, Response = any> = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export type Handler<Request = any, Response = any> = AsyncHandler<Request, Response> | SyncHandler<Request, Response>;
declare const METHODS: readonly ["ACL", "BIND", "CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LINK", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCALENDAR", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PRI", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REBIND", "REPORT", "SEARCH", "SOURCE", "SUBSCRIBE", "TRACE", "UNBIND", "UNLINK", "UNLOCK", "UNSUBSCRIBE"];
export type Method = (typeof METHODS)[number];
export type MiddlewareType = 'mw' | 'route';
type RegexParams = {
    keys: string[] | false;
    pattern: RegExp;
};
type RIM<Req, Res, App> = (...args: RouterMethodParams<Req, Res>) => App;
export interface Middleware<Req = any, Res = any> {
    method?: Method;
    handler: Handler<Req, Res>;
    path?: string;
    type: MiddlewareType;
    regex?: RegexParams;
    fullPath?: string;
}
export type MethodHandler<Req = any, Res = any> = {
    path?: string | string[] | Handler<Req, Res>;
    handler?: Handler<Req, Res>;
    type: MiddlewareType;
    regex?: RegexParams;
    fullPath?: string;
};
export type RouterHandler<Req = any, Res = any> = Handler<Req, Res> | Handler<Req, Res>[] | string[];
export type RouterPathOrHandler<Req = any, Res = any> = string | RouterHandler<Req, Res>;
export type RouterMethod<Req = any, Res = any> = (path: string | string[] | Handler<Req, Res>, handler?: RouterHandler<Req, Res>, ...handlers: RouterHandler<Req, Res>[]) => any;
type RouterMethodParams<Req = any, Res = any> = Parameters<RouterMethod<Req, Res>>;
export type UseMethod<Req = any, Res = any, App extends Router = any> = (path: RouterPathOrHandler<Req, Res> | App, handler?: RouterHandler<Req, Res> | App, ...handlers: (RouterHandler<Req, Res> | App)[]) => any;
export type UseMethodParams<Req = any, Res = any, App extends Router = any> = Parameters<UseMethod<Req, Res, App>>;
/**
 * Push wares to a middleware array
 * @param mw Middleware arrays
 */
export declare const pushMiddleware: <Req = any, Res = any>(mw: Middleware[]) => ({ path, handler, method, handlers, type, fullPaths }: MethodHandler<Req, Res> & {
    method?: Method;
    handlers?: RouterHandler<Req, Res>[];
    fullPaths?: string[];
}) => void;
/**
 * tinyhttp Router. Manages middleware and has HTTP methods aliases, e.g. `app.get`, `app.put`
 */
export declare class Router<App extends Router = any, Req = any, Res = any> {
    middleware: Middleware[];
    mountpath: string;
    parent: App;
    apps: Record<string, App>;
    acl: RIM<Req, Res, this>;
    bind: RIM<Req, Res, this>;
    checkout: RIM<Req, Res, this>;
    connect: RIM<Req, Res, this>;
    copy: RIM<Req, Res, this>;
    delete: RIM<Req, Res, this>;
    get: RIM<Req, Res, this>;
    head: RIM<Req, Res, this>;
    link: RIM<Req, Res, this>;
    lock: RIM<Req, Res, this>;
    merge: RIM<Req, Res, this>;
    mkactivity: RIM<Req, Res, this>;
    mkcalendar: RIM<Req, Res, this>;
    mkcol: RIM<Req, Res, this>;
    move: RIM<Req, Res, this>;
    notify: RIM<Req, Res, this>;
    options: RIM<Req, Res, this>;
    patch: RIM<Req, Res, this>;
    post: RIM<Req, Res, this>;
    pri: RIM<Req, Res, this>;
    propfind: RIM<Req, Res, this>;
    proppatch: RIM<Req, Res, this>;
    purge: RIM<Req, Res, this>;
    put: RIM<Req, Res, this>;
    rebind: RIM<Req, Res, this>;
    report: RIM<Req, Res, this>;
    search: RIM<Req, Res, this>;
    source: RIM<Req, Res, this>;
    subscribe: RIM<Req, Res, this>;
    trace: RIM<Req, Res, this>;
    unbind: RIM<Req, Res, this>;
    unlink: RIM<Req, Res, this>;
    unlock: RIM<Req, Res, this>;
    unsubscribe: RIM<Req, Res, this>;
    constructor();
    add(method: Method): (path: string | string[] | Handler<Req, Res>, handler?: RouterHandler<Req, Res>, ...handlers: RouterHandler<Req, Res>[]) => this;
    msearch(...args: RouterMethodParams<Req, Res>): this;
    all(...args: RouterMethodParams<Req, Res>): this;
    /**
     * Push middleware to the stack
     */
    use(...args: UseMethodParams<Req, Res, App>): this;
}
export {};
//# sourceMappingURL=index.d.ts.map