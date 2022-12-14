# clone-deep [![NPM version](https://img.shields.io/npm/v/clone-deep.svg?style=flat)](https://www.npmjs.com/package/clone-deep) [![NPM monthly downloads](https://img.shields.io/npm/dm/clone-deep.svg?style=flat)](https://npmjs.org/package/clone-deep) [![NPM total downloads](https://img.shields.io/npm/dt/clone-deep.svg?style=flat)](https://npmjs.org/package/clone-deep) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/clone-deep.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/clone-deep)

> Recursively (deep) clone JavaScript native types, like Object, Array, RegExp, Date as well as primitives.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save clone-deep
```

## Usage

```js
var cloneDeep = require('clone-deep');

var obj = {a: 'b'};
var arr = [obj];

var copy = cloneDeep(arr);
obj.c = 'd';

console.log(copy);
//=> [{a: 'b'}]

console.log(arr);
//=> [{a: 'b', c: 'd'}]
```

## Heads up!

The `instanceClone` function is invoked to clone objects that are not "plain" objects (as defined by [isPlainObject](#isPlainObject)`isPlainObject`) if it is provided. If `instanceClone` is not specified, it will not attempt to clone non-plain objects, and will copy the object reference.

## Attribution

Based on [mout's](https://github.com/mout/mout) implementation of deepClone.

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [is-plain-object](https://www.npmjs.com/package/is-plain-object): Returns true if an object was created by the `Object` constructor. | [homepage](https://github.com/jonschlinkert/is-plain-object "Returns true if an object was created by the `Object` constructor.")
* [isobject](https://www.npmjs.com/package/isobject): Returns true if the value is an object and not an array or null. | [homepage](https://github.com/jonschlinkert/isobject "Returns true if the value is an object and not an array or null.")
* [kind-of](https://www.npmjs.com/package/kind-of): Get the native type of a value. | [homepage](https://github.com/jonschlinkert/kind-of "Get the native type of a value.")
* [shallow-clone](https://www.npmjs.com/package/shallow-clone): Make a shallow clone of an object, array or primitive. | [homepage](https://github.com/jonschlinkert/shallow-clone "Make a shallow clone of an object, array or primitive.")

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright ?? 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on November 16, 2017._