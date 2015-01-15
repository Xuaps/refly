var slash = require('./slash.js');
var JSON = require('../app/JSON');
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
            "rl:references": "/api/references",
            "rl:get-reference": "/api/references/{docset}/{uri}",
            "rl:search-references": "/api/references{?name}"
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
var PAGE_SIZE = 20;

module.exports.get_references = function(pattern){
   return slash.search({reference: pattern})
       .then(function(references){
           return {
                links: {
                    self: '/api/references'
                },
                embeds: {
                   "references": references.slice(0,PAGE_SIZE).map(function(ref){
                       ref.docset_name = ref.docset;
                       ref.name = ref.reference;
                       delete ref.docset;
                       delete ref.reference;
                       return {
                            links: {
                                self: '/api/references' + ref.uri 
                            },
                            data: ref
                       };           
                    })
               }
           }; 
       });
};

module.exports.get_children_and_brothers = function(docset, uri){
    return slash.branch('/'+docset+'/'+uri, 1).then(function(references){
       list = JSON.Flatten(references);
       return {
            links: {
                self: '/api/references/' + docset + '/' + uri + '/c&b'
            },
            embeds: {
               "references": list.map(function(ref){
                   ref.docset_name = ref.docset;
                   ref.name = ref.reference;
                   delete ref.docset;
                   delete ref.reference;
                   delete ref.content;
                   return {
                        links: {
                            self: '/api/references' + ref.uri 
                        },
                        data: ref
                   };           
                })
           }
       };
    });
};
module.exports.get_ascendants = function(docset, uri){
    return slash.breadcrumbs('/'+docset+'/'+uri).then(function(references){
       return {
            links: {
                self: '/api/references/' + docset + '/' + uri + '/hierarchy'
            },
            embeds: {
               "hierarchy": references.map(function(ref){
                   ref.docset_name = ref.docset;
                   ref.name = ref.reference;
                   delete ref.docset;
                   delete ref.reference;
                   delete ref.content;
                   return {
                        links: {
                            self: '/api/references' + ref.uri 
                        },
                        data: ref
                   };           
                })
           }
       };
    });
};

module.exports.get_types = function(main_url, docset){
    return slash.get_types(docset).then(function(types) {
       return {
            links: {
                self: '/api/types' + (docset?'?docset=' + docset:'') 
            },
            embeds: {
               "types": types.map(function(type){
                   return {
                        name: type,
                        image: main_url + '/img/type-' + type.toLowerCase() + '.png'
                   };           
                })
           }
       };
    });
}
module.exports.get_docset = function(main_url, name){
    return slash.get_docset(name)
        .then(function(docset) {
            return { 
                links: {
                    self: '/api/docsets/' + docset.docset 
                },
                data: {
                    name: docset.docset,
                    start_uri: docset.default_uri,
                    latest_version_date: docset.update_date,
                    publication_date: docset.pub_date,
                    is_active: docset.active,
                    description: docset.label,
                    image: main_url + '/img/languages/' + docset.docset.toLowerCase() + '-logo.png'
                }
             };        
        });
};

//tood change name get_docsetbydate
module.exports.get_docsets = function(main_url, active){
    return slash.get_docsetsbydate(active).then(function(docsets) {
       return {
            links: {
                self: '/api/docsets' + (active?'?active=' + active:'') 
            },
            embeds: {
               "docsets": docsets.map(function(docset){
                   return {
                        links: {
                            self: '/api/docsets/' + docset.docset 
                        },
                        name: docset.docset,
                        start_uri: docset.default_uri,
                        latest_version_date: docset.update_date,
                        description: docset.label,
                        is_active: docset.active,
                        image: main_url + '/img/languages/' + docset.docset.toLowerCase() + '-logo.png',
                        bigimage: main_url + '/img/languages/' + docset.docset.toLowerCase() + '-biglogo.jpg'
                   };           
                })
           }
       };
    });
};
