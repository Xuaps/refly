module.exports.entry = function(){
    return {
        links: {
            self: '/api',
            curies: [
                {
                    name: "rl",
                    href: "http://refly.co/rels/{rel}",
                    templated: true
                }
            ],
            "rl:references": "/api/references"
        }
    };
};
