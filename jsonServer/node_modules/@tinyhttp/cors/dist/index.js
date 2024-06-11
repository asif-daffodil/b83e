import { vary } from 'es-vary';

/**
 * CORS Middleware
 */
const cors = (opts = {}) => {
    const { origin = '*', methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], allowedHeaders = ['content-type'], exposedHeaders, credentials, maxAge, optionsSuccessStatus = 204, preflightContinue = false } = opts;
    return (req, res, next) => {
        var _a, _b;
        // Checking the type of the origin property
        if (typeof origin === 'boolean' && origin === true) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        else if (typeof origin === 'string') {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        else if (typeof origin === 'function') {
            res.setHeader('Access-Control-Allow-Origin', origin(req, res));
        }
        else if (typeof origin === 'object') {
            if (Array.isArray(origin) && (origin.indexOf(req.headers.origin) !== -1 || origin.indexOf('*') !== -1)) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            }
            else if (origin instanceof RegExp && origin.test(req.headers.origin)) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            }
            else {
                throw new TypeError('No other objects allowed. Allowed types is array of strings or RegExp');
            }
        }
        if ((typeof origin === 'string' && origin !== '*') || typeof origin === 'function')
            vary(res, 'Origin');
        // Setting the Access-Control-Allow-Methods header from the methods array
        res.setHeader('Access-Control-Allow-Methods', methods.join(', ').toUpperCase());
        // Setting the Access-Control-Allow-Headers header
        if (allowedHeaders)
            res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
        // Setting the Access-Control-Expose-Headers header
        if (exposedHeaders)
            res.setHeader('Access-Control-Expose-Headers', exposedHeaders);
        // Setting the Access-Control-Allow-Credentials header
        if (credentials)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        // Setting the Access-Control-Max-Age header
        if (maxAge)
            res.setHeader('Access-Control-Max-Age', maxAge);
        if (((_b = (_a = req.method) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'OPTIONS') {
            if (preflightContinue) {
                next === null || next === void 0 ? void 0 : next();
            }
            else {
                res.statusCode = optionsSuccessStatus;
                res.setHeader('Content-Length', '0');
                res.end();
            }
        }
        else {
            next === null || next === void 0 ? void 0 : next();
        }
    };
};

export { cors };
