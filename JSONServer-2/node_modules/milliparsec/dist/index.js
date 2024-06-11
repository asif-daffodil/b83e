const hasBody = (method) => ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
// Main function
const p = (fn) => async (req, _res, next) => {
    try {
        let body = '';
        for await (const chunk of req)
            body += chunk;
        return fn(body);
    }
    catch (e) {
        next(e);
    }
};
// JSON, raw, FormData
const custom = (fn) => async (req, _res, next) => {
    req.body = await p(fn)(req, undefined, next);
    next();
};
const json = () => async (req, res, next) => {
    if (hasBody(req.method)) {
        req.body = await p((x) => (x ? JSON.parse(x.toString()) : {}))(req, res, next);
        next();
    }
    else
        next();
};
const raw = () => async (req, _res, next) => {
    if (hasBody(req.method)) {
        req.body = await p((x) => x)(req, _res, next);
        next();
    }
    else
        next();
};
const text = () => async (req, _res, next) => {
    if (hasBody(req.method)) {
        req.body = await p((x) => x.toString())(req, _res, next);
        next();
    }
    else
        next();
};
const urlencoded = () => async (req, res, next) => {
    if (hasBody(req.method)) {
        req.body = await p((x) => {
            const urlSearchParam = new URLSearchParams(x.toString());
            return Object.fromEntries(urlSearchParam.entries());
        })(req, res, next);
        next();
    }
    else
        next();
};

export { custom, hasBody, json, p, raw, text, urlencoded };
