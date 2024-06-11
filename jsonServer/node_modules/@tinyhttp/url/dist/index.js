import { parse } from "node:querystring";
const getURLParams = ({ pattern, keys }, reqUrl = "/") => {
  const matches = pattern.exec(reqUrl);
  const params = {};
  if (matches && typeof keys !== "boolean")
    for (let i = 0; i < keys.length; i++) {
      if (matches[i + 1]) {
        params[keys[i]] = decodeURIComponent(matches[i + 1]);
      }
    }
  return params;
};
const getQueryIndex = (url) => {
  const index = url.indexOf("?");
  return index === -1 ? url.length : index;
};
const getPathname = (url) => url.slice(0, getQueryIndex(url));
const getQueryParams = (url = "/") => parse(url.slice(getQueryIndex(url) + 1));
export {
  getPathname,
  getQueryParams,
  getURLParams
};
//# sourceMappingURL=index.js.map
