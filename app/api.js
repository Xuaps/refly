var Q = require('q');
var slash = require('./slash.js');
var Users = require('./users.js');
var JSON = require('../app/JSON');
var ReferenceVO = require('./reference_vo.js');
var util = require('util');
var config = require('config');
var CreditCardError = require('./errors/credit-card.js');
var InternalError = require('./errors/internal.js');

module.exports.entry = function(){
    return {
        links: {
            self: '/api',
            curies: [
                {
                    name: "rl",
                    href: "http://refly.xyz/rels/{rel}",
                    templated: true
                }
            ],
            "rl:references": { href: "/api/references?{name,docset,type,pagesize,page}", templated: true },
            "rl:types": { href: "/api/types?{docset}", templated: true},
            "rl:docsets": { href: "/api/docsets?{active}", templated: true}
        }
    };
};

module.exports.get_reference = function(docset, uri){
    var old_identifier = docset + '/' + uri;

    return slash.get(old_identifier).then(function(reference) {
        if (!reference){
            throw new Error('Reference not found.');
        }

        return {
            links: {
                self: '/api/references/' + docset +'/'+uri,
                curies: getCuries(),
                "rl:docset": "/api/docsets/" + docset,
                "rl:hierarchy": "/api/references/" + old_identifier + "/hierarchy",
                "rl:c&b": "/api/references/" + old_identifier + "/c&b"
            },
            data: {
                uri: reference.uri,
                name: reference.reference,
                type: reference.type,
                content: reference.content,
                content_anchor: reference.content_anchor
            }
        };
    });
};
var DEFAULT_PAGE_SIZE = 60;
var DEFAULT_PAGE = 1;

module.exports.get_references = function(query){
   query.pagesize = query.pagesize || DEFAULT_PAGE_SIZE;
   query.page = query.page || DEFAULT_PAGE;
   return slash.search(query)
       .then(function(references){
           var response = {
                links: {
                    self: '/api/references',
                    curies: getCuries()
                },
                embeds: {
                   "rl:references": references.items.map(function(ref){
                       return {
                            links: {
                                self: '/api/references' + ref.uri 
                            },
                            data: ReferenceVO.fromRef(ref) 
                       };           
                    })
               }
           }; 
           if(query.page>1)
                response.links['prev'] = util.format('/api/references?page=%d&pagesize%d', parseInt(query.page)-1, query.pagesize);
           if(query.page<(references.total/query.pagesize))
                response.links['next'] = util.format('/api/references?page=%d&pagesize%d', parseInt(query.page)+1, query.pagesize);

           return response;
       });
};

module.exports.get_children_and_brothers = function(docset, uri){
    return slash.branch('/'+docset+'/'+uri, 1).then(function(references){
       list = JSON.Flatten(references);
       return {
            links: {
                self: '/api/references/' + docset + '/' + uri + '/c&b',
                curies: getCuries()
            },
            embeds: {
               "rl:references": list.map(function(ref){
                   return {
                        links: {
                            self: '/api/references' + ref.uri 
                        },
                        data: ReferenceVO.fromRef(ref) 
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
                self: '/api/references/' + docset + '/' + uri + '/hierarchy',
                curies: getCuries()
            },
            embeds: {
               "rl:hierarchy": references.map(function(ref){
                   return {
                        links: {
                            self: '/api/references' + ref.uri 
                        },
                        data: ReferenceVO.fromRef(ref)
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
                self: '/api/types' + (docset?'?docset=' + docset:''),
                curies: getCuries(),
            },
            embeds: {
               "rl:types": types.map(function(type){
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
            if(docset==null)
                return {};
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
                    image: main_url + '/img/languages/' + docset.docset.toLowerCase() + '-logo.png',
                    bigimage: main_url + '/img/languages/' + docset.docset.toLowerCase() + '-biglogo.jpg'

                }
             };        
        });
};

module.exports.get_docsets = function(main_url, active){
    return slash.get_docsets(active).then(function(docsets) {
       return {
            links: {
                self: '/api/docsets' + (active?'?active=' + active:''), 
                curies: getCuries(),
            }, 
            embeds: {
               "rl:docsets": docsets.map(function(docset){
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

module.exports.get_docsetsbyuser = function(main_url, token){
    return slash.get_docsetsbyuser(token).then(function(docsets) {
       return {
            links: {
                self: '/api/settings',
                curies: getCuries(),
            },
            embeds: {
               "rl:docsets": docsets.map(function(docset){
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
module.exports.savedocsetxuser = function(main_url, token, docsets){
    return slash.savedocsetxuser(token,docsets).then(function() {
       return {
            links: {
                self: '/api/settings?docsets=' + docsets,
                curies: getCuries(),
            },
            data: {
                message: "Selection saved"
            }
       };
    });
};

module.exports.findUser = function(token){
    return new Users().find({auth_token: token})
        .then(function(users){
            return {
                links: {
                    self: '/api/users/current',
                    curies: getCuries(),
                },
                data: {
                    email: users[0].email
                }
            };
        });
};

module.exports.deleteSession = function(token){
    return new Users().revokeAccessToken({auth_token: token})
        .then(function(){
            return {
                links: {
                    self: '/api/session',
                    curies: getCuries(),
                },
                data: {
                    message: "Session removed"
                }
            };
        });
};

var getCustomer = function(user, token){
    if(user.stripe_id){
        return stripe.customers.retrieve(user.stripe_id);
    }else{
        return stripe.customers.create({
            source: token,
            email: user.email
        });
    }
};

var getCuries = function(){
    return [
                {
                    name: "rl",
                    href: "http://refly.xyz/rels/{rel}",
                    templated: true
                }
            ]; 
};
