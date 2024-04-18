# @kmaayeh/cy-api

> this is a fork work from @bahmutov/cy-api   all credits goes to him not me i only changed the ui of the view  

[![renovate-app badge][renovate-badge]][renovate-app] [![CircleCI](https://circleci.com/gh/maayehkhaled/cy-api/tree/master.svg?style=svg&circle-token=b9f64878ead36e2da438a0563cc4566269aa452b)](https://circleci.com/gh/kmaayeh/cy-api/tree/master) ![cypress version](https://img.shields.io/badge/cypress-13.7.2-brightgreen)

> Cypress custom command "cy.api" for end-to-end API testing

This command makes HTTP requests to external servers, then renders the input and output where the web application usually is in the Cypress Test Runner. If there are server-side logs using [@bahmutov/all-logs][all-logs], this command fetches them and renders too. Here is typical output:


## Install

```
npm install --save-dev @kmaayeh/cy-api
```

or

```
yarn add -D @kmaayeh/cy-api
```

Add the following line to your Cypress support file

```js
// usually cypress/support/index.js
import '@kmaayeh/cy-api'
```

This will add a new command `cy.api` for making API requests.

## Configuration

| var env                      | default value | description                           |
| ---------------------------- | ------------- | ------------------------------------- |
| CYPRESS_API_MESSAGES         | true          | Show and make call to api server logs |
| CYPRESS_API_SHOW_CREDENTIALS | false         | Show authentication password          |

By default `cy.api` print response in the browser. To have the same behaviour as `cy.request` and use `cy.visit` normally, you need to desactivate `apiDisplayRequest` :

```js
it('my test without displaying request', { apiDisplayRequest: false }, () => {
  cy.api({
    url: '/',
  })
})
```

## TypeScript

If your using TypeScript with Cypress, you can add type in your `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["cypress", "@kmaayeh/cy-api"]
  }
}
```

## Examples

- [bahmutov/server-logs-example](https://github.com/bahmutov/server-logs-example)

### Courses
 > this is a great course please have a look 
- 🎓 [Cypress Plugins](https://cypress.tips/courses/cypress-plugins/)
  - [Lesson f2: Write an API test using the cy.api command](https://cypress.tips/courses/cypress-plugins/lessons/f2)

## More info
> more information about cypress 
- Read [Black box API testing with server logs](https://glebkmaayeh.com/blog/api-testing-with-server-logs/)
- Read [Capture all the logs](https://glebkmaayeh.com/blog/capture-all-the-logs/) and [@kmaayeh/all-logs][all-logs] module.
- Read [You Should Test More Using APIs](https://glebkmaayeh.com/blog/test-using-apis/)
- Read [Use Cypress For API Testing](https://glebkmaayeh.com/blog/use-cypress-for-api-testing/)

[all-logs]: https://github.com/bahmutov/all-logs

### Small print

Author: Gleb bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2019

- [@kmaayeh](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebkmaayeh.com)
- [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/kmaayeh/cy-api/issues) on Github

## MIT License

Copyright (c) 2019 khaled maayeh &lt;maayehkhaled@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
