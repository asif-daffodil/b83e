# @tinyhttp/content-type

[![Version][v-badge-url]][npm-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url]

> [`content-type`](https://github.com/jshttp/content-type) rewrite in TypeScript and ESM.

Create and parse HTTP Content-Type header according to RFC 7231

## Install

```sh
pnpm i @tinyhttp/content-type
```

## API

```ts
import { parse, format } from '@tinyhttp/content-type'
```

### `parse(string: string | Request | Response)`

```ts
const obj = parse('image/svg+xml; charset=utf-8')
```

Parse a `Content-Type` header. This will return an object with the following
properties (examples are shown for the string `'image/svg+xml; charset=utf-8'`):

- `type`: The media type (the type and subtype, always lower case).
  Example: `'image/svg+xml'`

- `parameters`: An object of the parameters in the media type (name of parameter
  always lower case). Example: `{charset: 'utf-8'}`

Throws a `TypeError` if the string is missing or invalid.

```ts
const obj = contentType.parse(req)
```

Parse the `Content-Type` header from the given `req`. Short-cut for
`contentType.parse(req.headers['content-type'])`.

Throws a `TypeError` if the `Content-Type` header is missing or invalid.

```js
const obj = contentType.parse(res)
```

Parse the `Content-Type` header set on the given `res`. Short-cut for
`contentType.parse(res.getHeader('content-type'))`.

Throws a `TypeError` if the `Content-Type` header is missing or invalid.

### `format(obj)`

```ts
const str = contentType.format({
  type: 'image/svg+xml',
  parameters: { charset: 'utf-8' },
})
```

Format an object into a `Content-Type` header. This will return a string of the
content type for the given object with the following properties (examples are
shown that produce the string `'image/svg+xml; charset=utf-8'`):

- `type`: The media type (will be lower-cased). Example: `'image/svg+xml'`

- `parameters`: An object of the parameters in the media type (name of the
  parameter will be lower-cased). Example: `{charset: 'utf-8'}`

Throws a `TypeError` if the object contains an invalid type or parameter names.

[v-badge-url]: https://img.shields.io/npm/v/@tinyhttp/content-type.svg?style=for-the-badge&color=FF69B4&label=&logo=npm
[npm-url]: https://www.npmjs.com/package/@tinyhttp/content-type
[cov-badge-url]: https://img.shields.io/coveralls/github/tinyhttp/content-type?style=for-the-badge&color=FF69B4
[cov-url]: https://coveralls.io/github/tinyhttp/@tinyhttp/content-type
[dl-badge-url]: https://img.shields.io/npm/dt/@tinyhttp/content-type?style=for-the-badge&color=FF69B4
[github-actions]: https://github.com/tinyhttp/content-type/actions
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/tinyhttp/content-type/ci.yml?branch=master&style=for-the-badge&color=FF69B4&label=&logo=github
