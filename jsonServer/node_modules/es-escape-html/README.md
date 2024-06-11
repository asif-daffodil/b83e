# es-escape-html

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]

Escape string for use in HTML

This module exports a single function, `escapeHtml`, that is used to escape
a string of content such that it can be interpolated in HTML content.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install es-escape-html
```

## API

### escapeHtml(string)

Escape special characters in the given string of text, such that it can be
interpolated in HTML content.

This function will escape the following characters: `"`, `'`, `&`, `<`, and
`>`.

**Note** that the escaped value is only suitable for being interpolated into
HTML as the text content of elements in which the tag does not have different
escaping mechanisms (it cannot be placed inside `<style>` or `<script>`, for
example, as those content bodies are not HTML, but CSS and JavaScript,
respectively; these are known as "raw text elements" in the HTML standard).

**Note** when using the escaped value within a tag, it is only suitable as
the value of an attribute, where the value is quoted with either a double
quote character (`"`) or a single quote character (`'`).

## Example

The `escapeHtml` function is designed to accept a string input of text and
return an escaped value to interpolate into HTML.

```js
import { escapeHtml } from "es-escape-html";

// Example values
const desc = "I <b>think</b> this is good.";
const fullName = 'John "Johnny" Smith';

// Example passing in text into a html attribute
console.dir(`<input name="full_name" value="${escapeHtml(fullName)}" />`);
// -> '<input name="full_name" value="John &quot;Johnny&quot; Smith">'

// Example passing in text in html body
console.dir(`<textarea name="desc">${escapeHtml(desc)}</textarea>`);
// -> '<textarea name="desc">I &lt;b&gt;think&lt;/b&gt; this is good.</textarea>'
```

## Todo

- Reimplement testing from [component/escape-html](https://github.com/component/escape-html/tree/master/test)
- Reimplement benchmarks from [component/escape-html](https://github.com/component/escape-html/tree/master/benchmark)

## License

[MIT](LICENSE)

[coveralls-image]: https://badgen.net/coveralls/c/github/component/es-escape-html/master
[coveralls-url]: https://coveralls.io/r/component/es-escape-html?branch=master
[npm-downloads-image]: https://badgen.net/npm/dm/es-escape-html
[npm-url]: https://npmjs.org/package/es-escape-html
[npm-version-image]: https://badgen.net/npm/v/es-escape-html
[travis-image]: https://badgen.net/travis/component/es-escape-html/master
[travis-url]: https://travis-ci.org/component/es-escape-html
