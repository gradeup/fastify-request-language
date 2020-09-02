# fastify-request-language
![Build Status](https://img.shields.io/github/workflow/status/gradeup/fastify-request-language/Continuous%20Integration?style=flat-square) 
![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)

Adds language to [the Fastify `request` object](https://www.fastify.io/docs/master/Request/) by parsing `Accept-Language` HTTP Header.

## Requirements
- Node >= 12
- fastify >= 3

## Install
```sh npm install fastify-request-language```

## Usage 
```js
const fastify = require('fastify')({
	logger: true,
	trustProxy: true,
});

fastify.register(require('fastify-request-language'), {
    languages: ['en', 'hi'],
});

// Access language in request.language
fastify.get('/', (request, reply) => {
    reply.send({ language: request.language });
});

```