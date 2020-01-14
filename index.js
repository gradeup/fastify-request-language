
'use strict';

const acceptLanguage = require('accept-language');
const bcp47 = require('bcp47');

module.exports = function(props) {
    'use strict';
    
    // Check that the language tag is set and that it is an array
    if(typeof props.languages === 'undefined' || Object.prototype.toString.call(props.languages) !== '[object Array]') {
        throw new TypeError('You must define your languages in an array of strings.');
    }
    props.languages.forEach(function(languageTag) {
        var language = bcp47.parse(languageTag);
        if(language === null) {
            throw new TypeError('Your language tag \'' + languageTag + '\' is not BCP47 compliant. For more info https://tools.ietf.org/html/bcp47.')
        }
    });
    
    acceptLanguage.languages(props.languages);

    return function fastifyRequestLanguage(req, res, next) {
        req.language = acceptLanguage.get(req.headers['accept-language']);
        next();
    }
}