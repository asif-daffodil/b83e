# es-vary

![Vulnerabilities][snyk-image]
[![Version][npm-v-image]][npm-url]
[![Node Version][node-version-image]][node-version-url]

> [`vary`](https://github.com/jshttp/vary) rewrite in TypeScript with ESM and CommonJS targets

Manipulate the HTTP Vary header

## Install

```sh
pnpm i es-vary
```

## API

```ts
import { vary, append } from 'es-vary'
```

### `vary(res, field)`

Adds the given header `field` to the `Vary` response header of `res`.
This can be a string of a single field, a string of a valid `Vary`
header, or an array of multiple fields.

This will append the header if not already listed, otherwise leaves
it listed in the current location.

```ts
vary(res, 'Origin')
```

### `append(header, field)`

Adds the given header `field` to the `Vary` response header string `header`.
This can be a string of a single field, a string of a valid `Vary` header,
or an array of multiple fields.

This will append the header if not already listed, otherwise leaves
it listed in the current location. The new header string is returned.

```ts
// Get header string appending "Origin" to "Accept, User-Agent"
append('Accept, User-Agent', 'Origin')
```

## Examples

```ts
import { createServer } from 'http'
import { vary } from 'es-vary'

createServer((req, res) => {
  // about to user-agent sniff
  vary(res, 'User-Agent')

  const ua = req.headers['user-agent'] || ''
  const isMobile = /mobi|android|touch|mini/i.test(ua)

  // serve site, depending on isMobile
  res.setHeader('Content-Type', 'text/html')
  res.end('You are (probably) ' + (isMobile ? '' : 'not ') + 'a mobile user')
})
```

## License

MIT © [v1rtl](https://v1rtl.site)

[node-version-image]: https://img.shields.io/node/v/es-vary.svg?style=flat-square
[node-version-url]: https://nodejs.org
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/npm/es-vary.svg?style=flat-square
[npm-v-image]: https://img.shields.io/npm/v/es-vary.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/es-vary
