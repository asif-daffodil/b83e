const METHODS = [
  "ACL",
  "BIND",
  "CHECKOUT",
  "CONNECT",
  "COPY",
  "DELETE",
  "GET",
  "HEAD",
  "LINK",
  "LOCK",
  "M-SEARCH",
  "MERGE",
  "MKACTIVITY",
  "MKCALENDAR",
  "MKCOL",
  "MOVE",
  "NOTIFY",
  "OPTIONS",
  "PATCH",
  "POST",
  "PRI",
  "PROPFIND",
  "PROPPATCH",
  "PURGE",
  "PUT",
  "REBIND",
  "REPORT",
  "SEARCH",
  "SOURCE",
  "SUBSCRIBE",
  "TRACE",
  "UNBIND",
  "UNLINK",
  "UNLOCK",
  "UNSUBSCRIBE"
];
const createMiddlewareFromRoute = ({
  path,
  handler,
  fullPath,
  method
}) => ({
  method,
  handler: handler || path,
  path: typeof path === "string" ? path : "/",
  fullPath: typeof path === "string" ? fullPath : path
});
const pushMiddleware = (mw) => ({
  path,
  handler,
  method,
  handlers,
  type,
  fullPaths
}) => {
  const m = createMiddlewareFromRoute({ path, handler, method, type, fullPath: fullPaths == null ? void 0 : fullPaths[0] });
  let waresFromHandlers = [];
  let idx = 1;
  if (handlers) {
    waresFromHandlers = handlers.flat().map(
      (handler2) => createMiddlewareFromRoute({
        path,
        handler: handler2,
        method,
        type,
        fullPath: fullPaths == null ? null : fullPaths[idx++]
      })
    );
  }
  for (const mdw of [m, ...waresFromHandlers])
    mw.push({ ...mdw, type });
};
class Router {
  constructor() {
    this.middleware = [];
    this.mountpath = "/";
    this.apps = {};
    for (const m of METHODS) {
      this[m.toLowerCase()] = this.add(m);
    }
  }
  add(method) {
    return (...args) => {
      const handlers = args.slice(1).flat();
      if (Array.isArray(args[0])) {
        Object.values(args[0]).forEach((arg) => {
          if (typeof arg == "string") {
            pushMiddleware(this.middleware)({
              path: arg,
              handler: handlers[0],
              handlers: handlers.slice(1),
              method,
              type: "route"
            });
          }
        });
      } else {
        pushMiddleware(this.middleware)({
          path: args[0],
          handler: handlers[0],
          handlers: handlers.slice(1),
          method,
          type: "route"
        });
      }
      return this;
    };
  }
  msearch(...args) {
    const handlers = args.slice(1).flat();
    pushMiddleware(this.middleware)({
      path: args[0],
      handler: handlers[0],
      handlers: handlers.slice(1),
      method: "M-SEARCH",
      type: "route"
    });
    return this;
  }
  all(...args) {
    const handlers = args.slice(1).flat();
    pushMiddleware(this.middleware)({
      path: args[0],
      handler: handlers[0],
      handlers: handlers.slice(1),
      type: "route"
    });
    return this;
  }
  /**
   * Push middleware to the stack
   */
  use(...args) {
    const base = args[0];
    const handlers = args.slice(1).flat();
    if (typeof base === "string") {
      pushMiddleware(this.middleware)({
        path: base,
        handler: handlers[0],
        handlers: handlers.slice(1),
        type: "mw"
      });
    } else {
      pushMiddleware(this.middleware)({
        path: "/",
        handler: Array.isArray(base) ? base[0] : base,
        handlers: Array.isArray(base) ? [...base.slice(1), ...handlers] : handlers,
        type: "mw"
      });
    }
    return this;
  }
}
export {
  Router,
  pushMiddleware
};
//# sourceMappingURL=index.js.map
