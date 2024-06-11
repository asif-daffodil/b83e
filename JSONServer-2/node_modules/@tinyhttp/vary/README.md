# @tinyhttp/vary

[![Version][v-badge-url]][npm-url] [![Downloads][dl-badge-url]][npm-url] [![GitHub Workflow Status][gh-actions-img]][github-actions] [![Codecov][cov-badge-url]][cov-url]

> [`vary`](https://github.com/jshttp/vary) rewrite in TypeScript with ESM and CommonJS targets

Manipulate the HTTP Vary header

## Install

```sh
pnpm i @tinyhttp/vary
```

## API

```ts
import { vary, append } from '@tinyhttp/vary'
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
import { createServer } from 'node:http'
import { vary } from '@tinyhttp/vary'

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

[v-badge-url]: https://img.shields.io/npm/v/@tinyhttp/vary.svg?style=for-the-badge&color=FF69B4&label=&logo=npm
[npm-url]: https://www.npmjs.com/package/@tinyhttp/vary
[cov-badge-url]: https://img.shields.io/coveralls/github/tinyhttp/vary?style=for-the-badge&color=FF69B4
[cov-url]: https://coveralls.io/github/tinyhttp/vary
[dl-badge-url]: https://img.shields.io/npm/dt/@tinyhttp/vary?style=for-the-badge&color=FF69B4
[github-actions]: https://github.com/tinyhttp/vary/actions
[gh-actions-img]: https://img.shields.io/github/actions/workflow/status/tinyhttp/vary/main.yml?branch=master&style=for-the-badge&color=FF69B4&label=&logo=github
