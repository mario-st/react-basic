import url from "url";

var parse = (match) => {
    let urlData = null;
    let results = {
        query: null,
        pathname: null
    };
    if (match && match.length) {
        urlData = url.parse(match[0], true);
        results.query = urlData.query;
        results.pathname = urlData.pathname;
    }
    return results;
};

export default [
    {
        /**
         * regular expression of URL
         */
        pattern: 'https://domain.example(.*)',

        /**
         * returns the data
         * @param match array Result of the resolution of the regular expression
         * @param params
         */
        fixtures: function (match, params) {
            let {query, pathname} = parse(match);
            if (pathname === '/hero') {
                if (query[ 'superhero' ]) {
                    return 'Your hero: ' + query[ 'superhero' ];
                } else {
                    return 'You didnt chose a hero';
                }
            }

            else if (pathname === '/hero/add') {
                if (query['superhero']) {
                    return 'The heros name is ' + query['superhero'] + ' and' +
                        ' his/her villain is called ' + params['villain'] + '.' +
                        ' The heros likes ' + params['preferences'] + '.'
                }
            }
        },

        /**
         * returns the result of the GET request
         *
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        get: function (match, data) {
            return {
                status: 200,
                ok: true,
                body: data
            };
        },

        /**
         * returns the result of the POST request
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        post: function (match, data) {
            return {
                ok: true,
                status: 200,
                body: data
            };
        }
    }
];