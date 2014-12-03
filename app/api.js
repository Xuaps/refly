var slash = require('./slash.js');
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

//TODO: 
//*change old id
//*don't ask for docset
//*rename reference to name
module.exports.get_reference = function(docset, uri){
    var old_identifier = docset + '/' + uri;

    return slash.get(old_identifier).then(function(reference) {
        if (!reference)
            return null;

        delete reference.docset;
        reference.name = reference.reference;
        delete reference.reference;
        
        return {
            links: {
                self: '/api/references/' + docset +'/'+uri,
                curies: [
                    {
                        name: "rl",
                        href: "http://refly.co/rels/{rel}",
                        templated: true
                    }
                ],
                "rl:docset": "/api/docsets/" + docset,
                "rl:ascendants": "/api/references/ascendants/" + old_identifier,
                "rl:relatives": "/api/references/relatives/" + old_identifier
            },
            data: reference
        };
    });
};
