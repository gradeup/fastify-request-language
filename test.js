'use strict';

const {test} = require('tap');
const fastify = require('fastify');
const requestLanguage = require('.');

test('correctly parse accept language header', async t => {
	t.plan(2);
	const app = fastify();

	await app.register(requestLanguage, {languages: ['en', 'hi']});

	app.get('/', (request, reply) => {
		reply.send({language: request.language});
	});

	let response = await app.inject(
		{
			method: 'GET',
			url: '/',
			headers: {
				'Accept-Language': 'hi'
			}
		});
	let data = response.json();
	t.include(data, {language: 'hi'});

	response = await app.inject(
		{
			method: 'GET',
			url: '/',
			headers: {}
		});
	data = response.json();
	t.include(data, {language: 'en'});
});

test('Fail if language options are not passed pr not an array', t => {
	const app = fastify();
	t.plan(1);
	app.register(requestLanguage);
	app.ready(error => {
		t.ok(error instanceof Error);
	});
});

test('Fail if languages are invalid', t => {
	const app = fastify();
	t.plan(1);
	app.register(requestLanguage, {languages: ['en-12']});
	app.ready(error => {
		t.ok(error instanceof Error);
	});
});
