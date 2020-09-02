const fp = require('fastify-plugin');
const acceptLanguage = require('accept-language');
const bcp47 = require('bcp47');

module.exports = fp(
	(fastify, options, next) => {
		// Check that the language tag is set and that it is an array
		if (!options || !Array.isArray(options.languages)) {
			next(new TypeError(
				'You must define your languages in an array of strings.'
			));
			return;
		}

		for (const languageTag of options.languages) {
			const language = bcp47.parse(languageTag);
			if (language === null) {
				next(new TypeError(
					'Your language tag \'' +
            languageTag +
            '\' is not BCP47 compliant. For more info https://tools.ietf.org/html/bcp47.'
				));
				return;
			}
		}

		acceptLanguage.languages(options.languages);

		fastify.decorateRequest('language', '');

		fastify.addHook('onRequest', (request, reply, done) => {
			request.language = acceptLanguage.get(request.headers['accept-language']);
			done();
		});

		next();
	},
	{
		fastify: '3.x',
		name: 'fastify-request-language'
	}
);
