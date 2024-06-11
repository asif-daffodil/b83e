(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node:path'), require('node:fs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'node:path', 'node:fs'], factory) :
  (global = global || self, factory(global.eta = {}, global.path, global.fs));
})(this, (function (exports, path, fs) {
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return n;
  }

  var path__namespace = /*#__PURE__*/_interopNamespace(path);
  var fs__namespace = /*#__PURE__*/_interopNamespace(fs);

  /**
   * Handles storage and accessing of values
   *
   * In this case, we use it to store compiled template functions
   * Indexed by their `name` or `filename`
   */
  class Cacher {
    constructor(cache) {
      this.cache = void 0;
      this.cache = cache;
    }
    define(key, val) {
      this.cache[key] = val;
    }
    get(key) {
      return this.cache[key];
    }
    remove(key) {
      delete this.cache[key];
    }
    reset() {
      this.cache = {};
    }
    load(cacheObj) {
      this.cache = {
        ...this.cache,
        ...cacheObj
      };
    }
  }

  class EtaError extends Error {
    constructor(message) {
      super(message);
      this.name = "Eta Error";
    }
  }
  class EtaParseError extends EtaError {
    constructor(message) {
      super(message);
      this.name = "EtaParser Error";
    }
  }
  class EtaRuntimeError extends EtaError {
    constructor(message) {
      super(message);
      this.name = "EtaRuntime Error";
    }
  }
  class EtaFileResolutionError extends EtaError {
    constructor(message) {
      super(message);
      this.name = "EtaFileResolution Error";
    }
  }
  class EtaNameResolutionError extends EtaError {
    constructor(message) {
      super(message);
      this.name = "EtaNameResolution Error";
    }
  }
  /**
   * Throws an EtaError with a nicely formatted error and message showing where in the template the error occurred.
   */
  function ParseErr(message, str, indx) {
    const whitespace = str.slice(0, indx).split(/\n/);
    const lineNo = whitespace.length;
    const colNo = whitespace[lineNo - 1].length + 1;
    message += " at line " + lineNo + " col " + colNo + ":\n\n" + "  " + str.split(/\n/)[lineNo - 1] + "\n" + "  " + Array(colNo).join(" ") + "^";
    throw new EtaParseError(message);
  }
  function RuntimeErr(originalError, str, lineNo, path) {
    // code gratefully taken from https://github.com/mde/ejs and adapted
    const lines = str.split("\n");
    const start = Math.max(lineNo - 3, 0);
    const end = Math.min(lines.length, lineNo + 3);
    const filename = path;
    // Error context
    const context = lines.slice(start, end).map(function (line, i) {
      const curr = i + start + 1;
      return (curr == lineNo ? " >> " : "    ") + curr + "| " + line;
    }).join("\n");
    const header = filename ? filename + ":" + lineNo + "\n" : "line " + lineNo + "\n";
    const err = new EtaRuntimeError(header + context + "\n\n" + originalError.message);
    err.name = originalError.name; // the original name (e.g. ReferenceError) may be useful
    throw err;
  }

  /* END TYPES */
  /* istanbul ignore next */
  const AsyncFunction = async function () {}.constructor; // eslint-disable-line @typescript-eslint/no-empty-function
  /**
   * Takes a template string and returns a template function that can be called with (data, config)
   *
   * @param str - The template string
   * @param config - A custom configuration object (optional)
   */
  function compile(str, options) {
    const config = this.config;
    /* ASYNC HANDLING */
    // code gratefully taken from https://github.com/mde/ejs and adapted
    const ctor = options && options.async ? AsyncFunction : Function;
    /* END ASYNC HANDLING */
    try {
      return new ctor(config.varName, "options", this.compileToString.call(this, str, options)); // eslint-disable-line no-new-func
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new EtaParseError("Bad template syntax\n\n" + e.message + "\n" + Array(e.message.length + 1).join("=") + "\n" + this.compileToString.call(this, str, options) + "\n" // This will put an extra newline before the callstack for extra readability
        );
      } else {
        throw e;
      }
    }
  }

  /* TYPES */
  /* END TYPES */
  /**
   * Compiles a template string to a function string. Most often users just use `compile()`, which calls `compileToString` and creates a new function using the result
   */
  function compileToString(str, options) {
    const config = this.config;
    const isAsync = options && options.async;
    const compileBody = this.compileBody;
    const buffer = this.parse.call(this, str);
    // note: when the include function passes through options, the only parameter that matters is the filepath parameter
    let res = `${config.functionHeader}
let include = (template, data) => this.render(template, data, options);
let includeAsync = (template, data) => this.renderAsync(template, data, options);

let __eta = {res: "", e: this.config.escapeFunction, f: this.config.filterFunction${config.debug ? ', line: 1, templateStr: "' + str.replace(/\\|"/g, "\\$&").replace(/\r\n|\n|\r/g, "\\n") + '"' : ""}};

function layout(path, data) {
  __eta.layout = path;
  __eta.layoutData = data;
}${config.debug ? "try {" : ""}${config.useWith ? "with(" + config.varName + "||{}){" : ""}

${compileBody.call(this, buffer)}
if (__eta.layout) {
  __eta.res = ${isAsync ? "await includeAsync" : "include"} (__eta.layout, {...${config.varName}, body: __eta.res, ...__eta.layoutData});
}
${config.useWith ? "}" : ""}${config.debug ? "} catch (e) { this.RuntimeErr(e, __eta.templateStr, __eta.line, options.filepath) }" : ""}
return __eta.res;
`;
    if (config.plugins) {
      for (let i = 0; i < config.plugins.length; i++) {
        const plugin = config.plugins[i];
        if (plugin.processFnString) {
          res = plugin.processFnString(res, config);
        }
      }
    }
    return res;
  }
  /**
   * Loops through the AST generated by `parse` and transform each item into JS calls
   *
   * **Example**
   *
   * ```js
   * let templateAST = ['Hi ', { val: 'it.name', t: 'i' }]
   * compileBody.call(Eta, templateAST)
   * // => "__eta.res+='Hi '\n__eta.res+=__eta.e(it.name)\n"
   * ```
   */
  function compileBody(buff) {
    const config = this.config;
    let i = 0;
    const buffLength = buff.length;
    let returnStr = "";
    for (i; i < buffLength; i++) {
      const currentBlock = buff[i];
      if (typeof currentBlock === "string") {
        const str = currentBlock;
        // we know string exists
        returnStr += "__eta.res+='" + str + "'\n";
      } else {
        const type = currentBlock.t; // "r", "e", or "i"
        let content = currentBlock.val || "";
        if (config.debug) returnStr += "__eta.line=" + currentBlock.lineNo + "\n";
        if (type === "r") {
          // raw
          if (config.autoFilter) {
            content = "__eta.f(" + content + ")";
          }
          returnStr += "__eta.res+=" + content + "\n";
        } else if (type === "i") {
          // interpolate
          if (config.autoFilter) {
            content = "__eta.f(" + content + ")";
          }
          if (config.autoEscape) {
            content = "__eta.e(" + content + ")";
          }
          returnStr += "__eta.res+=" + content + "\n";
        } else if (type === "e") {
          // execute
          returnStr += content + "\n";
        }
      }
    }
    return returnStr;
  }

  /**
   * Takes a string within a template and trims it, based on the preceding tag's whitespace control and `config.autoTrim`
   */
  function trimWS(str, config, wsLeft, wsRight) {
    let leftTrim;
    let rightTrim;
    if (Array.isArray(config.autoTrim)) {
      // Slightly confusing,
      // but _}} will trim the left side of the following string
      leftTrim = config.autoTrim[1];
      rightTrim = config.autoTrim[0];
    } else {
      leftTrim = rightTrim = config.autoTrim;
    }
    if (wsLeft || wsLeft === false) {
      leftTrim = wsLeft;
    }
    if (wsRight || wsRight === false) {
      rightTrim = wsRight;
    }
    if (!rightTrim && !leftTrim) {
      return str;
    }
    if (leftTrim === "slurp" && rightTrim === "slurp") {
      return str.trim();
    }
    if (leftTrim === "_" || leftTrim === "slurp") {
      // full slurp
      str = str.trimStart();
    } else if (leftTrim === "-" || leftTrim === "nl") {
      // nl trim
      str = str.replace(/^(?:\r\n|\n|\r)/, "");
    }
    if (rightTrim === "_" || rightTrim === "slurp") {
      // full slurp
      str = str.trimEnd();
    } else if (rightTrim === "-" || rightTrim === "nl") {
      // nl trim
      str = str.replace(/(?:\r\n|\n|\r)$/, "");
    }
    return str;
  }
  /**
   * A map of special HTML characters to their XML-escaped equivalents
   */
  const escMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  function replaceChar(s) {
    return escMap[s];
  }
  /**
   * XML-escapes an input value after converting it to a string
   *
   * @param str - Input value (usually a string)
   * @returns XML-escaped string
   */
  function XMLEscape(str) {
    // To deal with XSS. Based on Escape implementations of Mustache.JS and Marko, then customized.
    const newStr = String(str);
    if (/[&<>"']/.test(newStr)) {
      return newStr.replace(/[&<>"']/g, replaceChar);
    } else {
      return newStr;
    }
  }

  /* END TYPES */
  /** Eta's base (global) configuration */
  const defaultConfig = {
    autoEscape: true,
    autoFilter: false,
    autoTrim: [false, "nl"],
    cache: false,
    cacheFilepaths: true,
    debug: false,
    escapeFunction: XMLEscape,
    // default filter function (not used unless enables) just stringifies the input
    filterFunction: val => String(val),
    functionHeader: "",
    parse: {
      exec: "",
      interpolate: "=",
      raw: "~"
    },
    plugins: [],
    rmWhitespace: false,
    tags: ["<%", "%>"],
    useWith: false,
    varName: "it",
    defaultExtension: ".eta"
  };

  /* END TYPES */
  const templateLitReg = /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g;
  const singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?'/g;
  const doubleQuoteReg = /"(?:\\[\s\w"'\\`]|[^\n\r"\\])*?"/g;
  /** Escape special regular expression characters inside a string */
  function escapeRegExp(string) {
    // From MDN
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  function getLineNo(str, index) {
    return str.slice(0, index).split("\n").length;
  }
  function parse(str) {
    const config = this.config;
    let buffer = [];
    let trimLeftOfNextStr = false;
    let lastIndex = 0;
    const parseOptions = config.parse;
    if (config.plugins) {
      for (let i = 0; i < config.plugins.length; i++) {
        const plugin = config.plugins[i];
        if (plugin.processTemplate) {
          str = plugin.processTemplate(str, config);
        }
      }
    }
    /* Adding for EJS compatibility */
    if (config.rmWhitespace) {
      // Code taken directly from EJS
      // Have to use two separate replaces here as `^` and `$` operators don't
      // work well with `\r` and empty lines don't work well with the `m` flag.
      // Essentially, this replaces the whitespace at the beginning and end of
      // each line and removes multiple newlines.
      str = str.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
    }
    /* End rmWhitespace option */
    templateLitReg.lastIndex = 0;
    singleQuoteReg.lastIndex = 0;
    doubleQuoteReg.lastIndex = 0;
    function pushString(strng, shouldTrimRightOfString) {
      if (strng) {
        // if string is truthy it must be of type 'string'
        strng = trimWS(strng, config, trimLeftOfNextStr,
        // this will only be false on the first str, the next ones will be null or undefined
        shouldTrimRightOfString);
        if (strng) {
          // replace \ with \\, ' with \'
          // we're going to convert all CRLF to LF so it doesn't take more than one replace
          strng = strng.replace(/\\|'/g, "\\$&").replace(/\r\n|\n|\r/g, "\\n");
          buffer.push(strng);
        }
      }
    }
    const prefixes = [parseOptions.exec, parseOptions.interpolate, parseOptions.raw].reduce(function (accumulator, prefix) {
      if (accumulator && prefix) {
        return accumulator + "|" + escapeRegExp(prefix);
      } else if (prefix) {
        // accumulator is falsy
        return escapeRegExp(prefix);
      } else {
        // prefix and accumulator are both falsy
        return accumulator;
      }
    }, "");
    const parseOpenReg = new RegExp(escapeRegExp(config.tags[0]) + "(-|_)?\\s*(" + prefixes + ")?\\s*", "g");
    const parseCloseReg = new RegExp("'|\"|`|\\/\\*|(\\s*(-|_)?" + escapeRegExp(config.tags[1]) + ")", "g");
    let m;
    while (m = parseOpenReg.exec(str)) {
      const precedingString = str.slice(lastIndex, m.index);
      lastIndex = m[0].length + m.index;
      const wsLeft = m[1];
      const prefix = m[2] || ""; // by default either ~, =, or empty
      pushString(precedingString, wsLeft);
      parseCloseReg.lastIndex = lastIndex;
      let closeTag;
      let currentObj = false;
      while (closeTag = parseCloseReg.exec(str)) {
        if (closeTag[1]) {
          const content = str.slice(lastIndex, closeTag.index);
          parseOpenReg.lastIndex = lastIndex = parseCloseReg.lastIndex;
          trimLeftOfNextStr = closeTag[2];
          const currentType = prefix === parseOptions.exec ? "e" : prefix === parseOptions.raw ? "r" : prefix === parseOptions.interpolate ? "i" : "";
          currentObj = {
            t: currentType,
            val: content
          };
          break;
        } else {
          const char = closeTag[0];
          if (char === "/*") {
            const commentCloseInd = str.indexOf("*/", parseCloseReg.lastIndex);
            if (commentCloseInd === -1) {
              ParseErr("unclosed comment", str, closeTag.index);
            }
            parseCloseReg.lastIndex = commentCloseInd;
          } else if (char === "'") {
            singleQuoteReg.lastIndex = closeTag.index;
            const singleQuoteMatch = singleQuoteReg.exec(str);
            if (singleQuoteMatch) {
              parseCloseReg.lastIndex = singleQuoteReg.lastIndex;
            } else {
              ParseErr("unclosed string", str, closeTag.index);
            }
          } else if (char === '"') {
            doubleQuoteReg.lastIndex = closeTag.index;
            const doubleQuoteMatch = doubleQuoteReg.exec(str);
            if (doubleQuoteMatch) {
              parseCloseReg.lastIndex = doubleQuoteReg.lastIndex;
            } else {
              ParseErr("unclosed string", str, closeTag.index);
            }
          } else if (char === "`") {
            templateLitReg.lastIndex = closeTag.index;
            const templateLitMatch = templateLitReg.exec(str);
            if (templateLitMatch) {
              parseCloseReg.lastIndex = templateLitReg.lastIndex;
            } else {
              ParseErr("unclosed string", str, closeTag.index);
            }
          }
        }
      }
      if (currentObj) {
        if (config.debug) {
          currentObj.lineNo = getLineNo(str, m.index);
        }
        buffer.push(currentObj);
      } else {
        ParseErr("unclosed tag", str, m.index);
      }
    }
    pushString(str.slice(lastIndex, str.length), false);
    if (config.plugins) {
      for (let i = 0; i < config.plugins.length; i++) {
        const plugin = config.plugins[i];
        if (plugin.processAST) {
          buffer = plugin.processAST(buffer, config);
        }
      }
    }
    return buffer;
  }

  /* END TYPES */
  function handleCache(template, options) {
    const templateStore = options && options.async ? this.templatesAsync : this.templatesSync;
    if (this.resolvePath && this.readFile && !template.startsWith("@")) {
      const templatePath = options.filepath;
      const cachedTemplate = templateStore.get(templatePath);
      if (this.config.cache && cachedTemplate) {
        return cachedTemplate;
      } else {
        const templateString = this.readFile(templatePath);
        const templateFn = this.compile(templateString, options);
        if (this.config.cache) templateStore.define(templatePath, templateFn);
        return templateFn;
      }
    } else {
      const cachedTemplate = templateStore.get(template);
      if (cachedTemplate) {
        return cachedTemplate;
      } else {
        throw new EtaNameResolutionError("Failed to get template '" + template + "'");
      }
    }
  }
  function render(template,
  // template name or template function
  data, meta) {
    let templateFn;
    const options = {
      ...meta,
      async: false
    };
    if (typeof template === "string") {
      if (this.resolvePath && this.readFile && !template.startsWith("@")) {
        options.filepath = this.resolvePath(template, options);
      }
      templateFn = handleCache.call(this, template, options);
    } else {
      templateFn = template;
    }
    const res = templateFn.call(this, data, options);
    return res;
  }
  function renderAsync(template,
  // template name or template function
  data, meta) {
    let templateFn;
    const options = {
      ...meta,
      async: true
    };
    if (typeof template === "string") {
      if (this.resolvePath && this.readFile && !template.startsWith("@")) {
        options.filepath = this.resolvePath(template, options);
      }
      templateFn = handleCache.call(this, template, options);
    } else {
      templateFn = template;
    }
    const res = templateFn.call(this, data, options);
    // Return a promise
    return Promise.resolve(res);
  }
  function renderString(template, data) {
    const templateFn = this.compile(template, {
      async: false
    });
    return render.call(this, templateFn, data);
  }
  function renderStringAsync(template, data) {
    const templateFn = this.compile(template, {
      async: true
    });
    return renderAsync.call(this, templateFn, data);
  }

  /* END TYPES */
  class Eta$1 {
    constructor(customConfig) {
      this.config = void 0;
      this.RuntimeErr = RuntimeErr;
      this.compile = compile;
      this.compileToString = compileToString;
      this.compileBody = compileBody;
      this.parse = parse;
      this.render = render;
      this.renderAsync = renderAsync;
      this.renderString = renderString;
      this.renderStringAsync = renderStringAsync;
      this.filepathCache = {};
      this.templatesSync = new Cacher({});
      this.templatesAsync = new Cacher({});
      // resolvePath takes a relative path from the "views" directory
      this.resolvePath = null;
      this.readFile = null;
      if (customConfig) {
        this.config = {
          ...defaultConfig,
          ...customConfig
        };
      } else {
        this.config = {
          ...defaultConfig
        };
      }
    }
    // METHODS
    configure(customConfig) {
      this.config = {
        ...this.config,
        ...customConfig
      };
    }
    withConfig(customConfig) {
      return {
        ...this,
        config: {
          ...this.config,
          ...customConfig
        }
      };
    }
    loadTemplate(name, template,
    // template string or template function
    options) {
      if (typeof template === "string") {
        const templates = options && options.async ? this.templatesAsync : this.templatesSync;
        templates.define(name, this.compile(template, options));
      } else {
        let templates = this.templatesSync;
        if (template.constructor.name === "AsyncFunction" || options && options.async) {
          templates = this.templatesAsync;
        }
        templates.define(name, template);
      }
    }
  }

  /* END TYPES */
  function readFile(path) {
    let res = "";
    try {
      res = fs__namespace.readFileSync(path, "utf8");
      // eslint-disable-line @typescript-eslint/no-explicit-any
    } catch (err) {
      if ((err == null ? void 0 : err.code) === "ENOENT") {
        throw new EtaFileResolutionError(`Could not find template: ${path}`);
      } else {
        throw err;
      }
    }
    return res;
  }
  function resolvePath(templatePath, options) {
    let resolvedFilePath = "";
    const views = this.config.views;
    if (!views) {
      throw new EtaFileResolutionError("Views directory is not defined");
    }
    const baseFilePath = options && options.filepath;
    const defaultExtension = this.config.defaultExtension === undefined ? ".eta" : this.config.defaultExtension;
    // how we index cached template paths
    const cacheIndex = JSON.stringify({
      filename: baseFilePath,
      path: templatePath,
      views: this.config.views
    });
    templatePath += path__namespace.extname(templatePath) ? "" : defaultExtension;
    // if the file was included from another template
    if (baseFilePath) {
      // check the cache
      if (this.config.cacheFilepaths && this.filepathCache[cacheIndex]) {
        return this.filepathCache[cacheIndex];
      }
      const absolutePathTest = absolutePathRegExp.exec(templatePath);
      if (absolutePathTest && absolutePathTest.length) {
        const formattedPath = templatePath.replace(/^\/*|^\\*/, "");
        resolvedFilePath = path__namespace.join(views, formattedPath);
      } else {
        resolvedFilePath = path__namespace.join(path__namespace.dirname(baseFilePath), templatePath);
      }
    } else {
      resolvedFilePath = path__namespace.join(views, templatePath);
    }
    if (dirIsChild(views, resolvedFilePath)) {
      // add resolved path to the cache
      if (baseFilePath && this.config.cacheFilepaths) {
        this.filepathCache[cacheIndex] = resolvedFilePath;
      }
      return resolvedFilePath;
    } else {
      throw new EtaFileResolutionError(`Template '${templatePath}' is not in the views directory`);
    }
  }
  function dirIsChild(parent, dir) {
    const relative = path__namespace.relative(parent, dir);
    return relative && !relative.startsWith("..") && !path__namespace.isAbsolute(relative);
  }
  const absolutePathRegExp = /^\\|^\//;

  class Eta extends Eta$1 {
    constructor(...args) {
      super(...args);
      this.readFile = readFile;
      this.resolvePath = resolvePath;
    }
  }

  exports.Eta = Eta;
  exports.EtaError = EtaError;
  exports.EtaFileResolutionError = EtaFileResolutionError;
  exports.EtaNameResolutionError = EtaNameResolutionError;
  exports.EtaParseError = EtaParseError;
  exports.EtaRuntimeError = EtaRuntimeError;

}));
//# sourceMappingURL=eta.umd.js.map
