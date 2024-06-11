# Header • Range • Parser

![Header • Range • Parser](https://raw.githubusercontent.com/r37r0m0d3l/header-range-parser/master/.github/assets/logo_200.webp?raw=true "Header • Range • Parser")

Range header field parser. Fork of a̶b̶a̶n̶d̶o̶n̶e̶d̶ [range-parser](https://github.com/jshttp/range-parser). If you write to me with a request to change or update something, I will do it. Honestly 👼.

[![NPM Version][npm-version-img]][npm-version-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]
[![GitHub Stars][gh-stars-img]][gh-stars-url]
[![Node.js Version][node-image]][node-url]
[![TypeScript Typings][ts-img]][ts-url]

[![GitHub Checks][gh-checks-img]][gh-checks-url]
[![Travis CI][travis-img]][travis-url]
[![Snyk][snyk-img]][snyk-url]

[![Maintainability Rating][sonarcloud-img]][sonarcloud-url]
[![LGTM][lgtm-img]][lgtm-url]
[![Codacy Badge][codacy-img]][codacy-url]
[![CodeFactor][codefactor-img]][codefactor-url]

[comment]: <> ([![Dependabot][dependabot-img]][dependabot-url])

## Installation

```bash
npm install header-range-parser
```

## API

<!-- eslint-disable no-unused-vars -->

```js
const {
  ERROR_INVALID_ARGUMENT,
  ERROR_STRING_IS_NOT_HEADER,
  ERROR_UNSATISFIABLE_RESULT,
  parseRange,
} = require("header-range-parser");
```

```typescript
import {
  ERROR_INVALID_ARGUMENT,
  ERROR_STRING_IS_NOT_HEADER,
  ERROR_UNSATISFIABLE_RESULT,
  ResultInvalid,
  ResultUnsatisfiable,
  ResultWrongArgument,
  parseRange,
} from "header-range-parser";
```

### parseRange(size, header, options)

```typescript
import {
  Result, Ranges, parseRange, Options,
} from "header-range-parser";

declare function parseRange(
  size: number, header: string, options?: Options,
): Ranges | Result;
```

| Parameter | Type      | Description                                           |
| :-------- | :---------| :---------------------------------------------------- |
| `size`    | `number`  | **Required**. Size in bytes.                          |
| `header`  | `string`  | **Required**. String containing header.               |
| `options` | `object`  | Optional options: combine (bool), throwError (bool).  |

Parse the given `header` string where `size` is the size of the selected
representation that is to be partitioned into sub-ranges. An array of sub-ranges
will be returned or negative numbers indicating an error parsing.

- `-1` or `ERROR_UNSATISFIABLE_RESULT` or ` esultUnsatisfiable` signals an unsatisfiable range

- `-2` or `ERROR_STRING_IS_NOT_HEADER` or `ResultInvalid` signals a malformed header string

- `-3` or `ERROR_INVALID_ARGUMENT` or `ResultWrongArgument` invalid parameters

<!-- eslint-disable no-undef -->

```js
// parse header from request
const subRanges = parseRange(
  size,
  request.headers.range,
);

// the type of the subranges
if (subRanges.type === "bytes") {
  // the ranges
  subRanges.forEach((range) => {
    // do something
    // with range.start
    // and range.end
  });
}
```

#### Options

These properties are accepted in the options object.

##### combine

Specifies if overlapping and adjacent sub-ranges should be combined, defaults to `false`.

When `true`, ranges will be combined and returned as if they were specified that way in the header.

##### throwError

Throw or suppress errors. Defaults to `true`.

<!-- eslint-disable no-undef -->

```js
parseRange(
  100,
  "bytes=50-55,0-10,5-10,56-60",
  {
    combine: true,
    throwError: false,
  });
//  [
//    { start: 0,  end: 10 },
//    { start: 50, end: 60 }
//  ]
```

## See also

[💾 My other projects](https://r37r0m0d3l.icu/open_source_map)

<img alt="Open Source" src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg?sanitize=true" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">

<!-- Badges -->

[npm-version-img]: https://badgen.net/npm/v/header-range-parser?&icon=npm&label=npm&color=DD3636&v=1.1.1
[npm-version-url]: https://npmjs.com/package/header-range-parser

[npm-downloads-img]: https://badgen.net/npm/dt/header-range-parser?&icon=terminal&label=downloads&color=009688&v=1.1.1
[npm-downloads-url]: https://npmjs.com/package/header-range-parser

[gh-stars-img]: https://badgen.net/github/stars/r37r0m0d3l/header-range-parser?&icon=github&label=stars&color=FFCC33&v=1.1.1
[gh-stars-url]: https://github.com/r37r0m0d3l/header-range-parser

[node-image]: https://badgen.net/npm/node/header-range-parser
[node-url]: https://nodejs.org/en/download

[gh-checks-img]: https://badgen.net/github/checks/r37r0m0d3l/header-range-parser?&icon=github&v=1.1.1
[gh-checks-url]: https://github.com/r37r0m0d3l/header-range-parser

[travis-img]: https://badgen.net/travis/r37r0m0d3l/header-range-parser?&icon=travis&label=build&v=1.1.1
[travis-url]: https://travis-ci.com/github/r37r0m0d3l/header-range-parser

[ts-img]: https://badgen.net/npm/types/header-range-parser?&icon=typescript&label=types&color=1E90FF&v=1.1.1
[ts-url]: https://github.com/r37r0m0d3l/header-range-parser/blob/main/dist/index.d.ts

[sonarcloud-img]: https://sonarcloud.io/api/project_badges/measure?project=r37r0m0d3l_header-range-parser&metric=sqale_rating&v=1.1.1
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=r37r0m0d3l_header-range-parser

[lgtm-img]: https://badgen.net/lgtm/grade/g/r37r0m0d3l/header-range-parser?&icon=lgtm&label=lgtm:js/ts&color=00C853&v=1.1.1
[lgtm-url]: https://lgtm.com/projects/g/r37r0m0d3l/header-range-parser/context:javascript

[codacy-img]: https://app.codacy.com/project/badge/Grade/b3458c991041406bbe85fdfd87498006
[codacy-url]: https://www.codacy.com/gh/r37r0m0d3l/header-range-parser/dashboard?&utm_source=github.com&amp;utm_medium=referral&amp;utm_content=r37r0m0d3l/header-range-parser&amp;utm_campaign=Badge_Grade

[snyk-img]: https://badgen.net/snyk/r37r0m0d3l/header-range-parser?&v=1.1.1
[snyk-url]: https://github.com/r37r0m0d3l/header-range-parser

[dependabot-img]: https://badgen.net/dependabot/r37r0m0d3l/header-range-parser?&icon=dependabot&v=1.1.1
[dependabot-url]: https://github.com/r37r0m0d3l/header-range-parser

[codefactor-img]: https://www.codefactor.io/repository/github/r37r0m0d3l/header-range-parser/badge?&style=flat-square&v=1.1.1
[codefactor-url]: https://www.codefactor.io/repository/github/r37r0m0d3l/header-range-parser