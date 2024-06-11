// src/index.ts
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
var QUOTE_REGEXP = /([\\"])/g;
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function qstring(val) {
  const str = String(val);
  if (TOKEN_REGEXP.test(str))
    return str;
  if (str.length > 0 && !TEXT_REGEXP.test(str))
    throw new TypeError("invalid parameter value");
  return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
}
function getcontenttype(obj) {
  let header;
  if ("getHeader" in obj && typeof obj.getHeader === "function") {
    header = obj.getHeader("content-type");
  } else if ("headers" in obj && typeof obj.headers === "object") {
    const h = obj.headers;
    header = h && h["content-type"];
  }
  if (typeof header !== "string") {
    throw new TypeError("content-type header is missing from object");
  }
  return header;
}
var ContentType = class {
  parameters;
  type;
  constructor(type) {
    this.parameters = {};
    this.type = type;
  }
};
function format(obj) {
  if (!obj || typeof obj !== "object")
    throw new TypeError("argument obj is required");
  const { parameters, type } = obj;
  if (!type || !TYPE_REGEXP.test(type))
    throw new TypeError("invalid type");
  let string = type;
  if (parameters && typeof parameters == "object") {
    const params = Object.keys(parameters).sort();
    for (const param of params) {
      if (!TOKEN_REGEXP.test(param))
        throw new TypeError("invalid parameter name");
      string += "; " + param + "=" + qstring(parameters[param]);
    }
  }
  return string;
}
function parse(string) {
  if (!string)
    throw new TypeError("argument string is required");
  const header = typeof string == "object" ? getcontenttype(string) : string;
  if (typeof header !== "string")
    throw new TypeError("argument string is required to be a string");
  let index = header.indexOf(";");
  const type = index != -1 ? header.slice(0, index).trim() : header.trim();
  if (!TYPE_REGEXP.test(type))
    throw new TypeError("invalid media type");
  const obj = new ContentType(type.toLowerCase());
  if (index != -1) {
    let key;
    let match;
    let value;
    PARAM_REGEXP.lastIndex = index;
    while (match = PARAM_REGEXP.exec(header)) {
      if (match.index !== index)
        throw new TypeError("invalid parameter format");
      index += match[0].length;
      key = match[1].toLowerCase();
      value = match[2];
      if (value[0] == '"') {
        value = value.slice(1, value.length - 1).replace(QESC_REGEXP, "$1");
      }
      obj.parameters[key] = value;
    }
    if (index != header.length)
      throw new TypeError("invalid parameter format");
  }
  return obj;
}
export {
  format,
  parse
};
