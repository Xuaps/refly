FORMAT: 1A

# Refly API
Refly API is a **references library** service.

# Refly API Root [/api]
Refly API entry point.

This resource offers the initial API affordances in the form of HAL links.

## Retrive Entry Point [GET]

+ Response 200 (application/hal+json; charset=utf-8)
    + Body
    
            {
                "_links": {

                    "self": { "href": "/api" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ],
                    "rl:references": { "href": "/api/references?{name}", "templated": true},
                    "rl:types": { "href": "/api/types?{docset}", "templated": true},
                    "rl:docsets": { "href": "/api/docsets?{name}", "templated": true}
                }
            }

# Group Reference
Reference resource of *Refly API*

## Reference [/api/references/{docset}/{uri}]
A single Reference object. The Reference resource is the central resource in the Refly API. It represents a single documentation node.  
The Reference resource has the following attributes:

- docset
- uri
- name
- type
- content

+ Parameters
   + docset (string, `slash`) ... Docset of the reference.
   + uri (string, `test.html`) ... URI indentifier for a reference in a docset.

+ Model (application/hal+json; charset=utf-8)

   HAL+JSON representation of Reference Resource. In addition to representing its state in the JSON form it offers affordances in the form of the HAL links.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/references/slash/test.html" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ],
                   "rl:docset": { "href": "/api/docsets/slash" },
                   "rl:hierarchy": { "href": "/api/references/slash/test.html/hierarchy" },
                   "rl:c&b": { "href": "/api/references/slash/test.html/c&b" }
               },
               "uri": "/slash/test.html",
               "name": "Slash reference",
               "type": "others",
               "content": "The content of the Reference's documentation"
            }

### Retrieve a Single Reference [GET]

+ Response 200

    [Reference][]

##References collection [/api/references{?name,docset,type}]
A collection of References.

The References Collection resource  **embeds* *Reference Resources* in the Refly API.

+ Model (application/hal+json; charset=utf-8)
    
    HAL+JSON representation of References Collection Resource. The Reference resource in collections are embedded. Note the embedded References resource are incomplete representation of the Reference in question. Use the respective Reference link  to retrive its full representation.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/references" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ]
                },
                "_embedded": {
                    "rl:references": [
                        {
                            "_links": {
                               "self": { "href": "/api/references/slash/test.html"}
                            },
                            "uri": "/slash/test.html",
                            "name": "search",
                            "type": "others",
                            "docset_name": "slash"
                        }    
                    ]
                 }
             }

### Retrieve References [GET]
+ Parameters
    + name (optional, string) ... Pattern to find matching references. Only References whose names contain this pattern are returned. Only 20 first coincidences are returned.
    + docset (optional, string) ... Docset name. Only references in this docset are returned.
    + type (optional, string) ... Reference's type. Only references os this type are returned.

+ Response 200

    [References collection][]

##Hierarchy collection [/api/references/{docset}/{uri}/hierarchy]
A collection of Reference's hierarchy.

+ Parameters
   + docset (string, `slash`) ... Docset of the reference.
   + uri (string, `test_4.html`) ... URI indentifier for a reference in a docset.

+ Model (application/hal+json; charset=utf-8)

    HAL+JSON representation of Reference's hierarchy collection Resource. References in hierarchy are embedded. Note embedded References resources are incomplete reprensentation of the Reference in question. Use the respective Reference link to retrieve its full reprensentation.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/references/slash/test.html/hierarchy" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ]
                },
                "_embedded": {
                    "rl:hierarchy": [
                        {
                            "_links": {
                               "self": { "href": "/api/references/slash/test.html"}
                            },
                            "uri": "/slash/test.html",
                            "name": "search",
                            "type": "others",
                            "docset_name": "slash"
                        }    
                    ]
                 }
             }

### Retrive Reference's hierarchy [GET]

+ Response 200

    [Hierarchy collection][]

##Children & Brothers collection [/api/references/{docset}/{uri}/c&b]
A collection of Reference's children and brothers.

+ Parameters
   + docset (string, `slash`) ... Docset of the reference.
   + uri (string, `test_4.html`) ... URI indentifier for a reference in a docset.

+ Model (application/hal+json; charset=utf-8)

    HAL+JSON representation of Reference's children and brothers collection Resource. References in hierarchy are embedded. Note embedded References resources are incomplete reprensentation of the Reference in question. Use the respective Reference link to retrieve its full reprensentation. This collection also contain searched Reference.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/references/slash/test.html/c&b" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ]
                },
                "_embedded": {
                    "rl:references": [
                        {
                            "_links": {
                               "self": { "href": "/api/references/slash/test.html"}
                            },
                            "uri": "/slash/test.html",
                            "name": "search",
                            "type": "others",
                            "docset_name": "slash"
                        }    
                    ]
                 }
             }

### Retrieve Reference's children and brothers [GET]
+ Response 200

    [Children & Brothers collection][]

#Group Type
A Type resource in *Refly API*

##Type collection [/api/types{?docset}]
A collection of Type resources.

The Type Collection resource  **embeds* *Types* in the Refly API.

+ Model (application/hal+json; charset=utf-8)

    + Body

            {
                "_links": {
                   "self": { "href": "/api/types" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ]
                },
                "_embedded": {
                    "rl:types": [
                        {
                            "name": "method",
                            "image": "http://myserver/images/method.jpg"
                        }    
                    ]
                 }
             }

### List All Types [GET]

+ Parameters
    + docset (optional, string) ... Docset resource name. Only types in this docset are returned.

+ Response 200

    [Type collection][]

#Group Docset
A Docset resource in *Refly API*

## Docset [/api/docsets/{name}]
A single Docset object. It represents a set of references.  
The Docset resource has the following attributes:

- name
- start_uri
- publication_date
- latest_version_date
- description
- is_active

+ Parameters
   + name (string, `slash`) ... Docset's name.

+ Model (application/hal+json; charset=utf-8)

   HAL+JSON representation of Docset Resource.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/docsets/slash" }
               },
               "name": "slash",
               "start_uri": "/slash/test.html",
               "publication_date": "2014-12-30T23:00:00.000Z",
               "latest_version_date": "2014-12-30T23:00:00.000Z",
               "description": "new",
               "is_active": true,
               "image": "http://myserver.com/img/docset.png",
               "bigimage": "http://myserver.com/img/bigdocset.png"
            }

### Retrieve a Single Docset [GET]

+ Response 200

    [Docset][]

##Docsets collection [/api/docsets{?active}]
A collection of Docset.

The Docsets collection resource  **embeds* *Docset Resources* in the Refly API.

+ Model (application/hal+json; charset=utf-8)
    
    HAL+JSON representation of Docsets Collection Resource. The Docset resource in collections are embedded. Note the embedded Docsets resource are incomplete representation of the Docset in question. Use the respective Docset link  to retrive its full representation.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/docsets" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ]
                },
                "_embedded": {
                    "rl:docsets": [
                        {
                            "_links": {
                               "self": { "href": "/api/docsets/slash"}
                            },
                           "name": "slash",
                           "start_uri": "/slash/test.html",
                           "latest_version_date": "2014-12-30T23:00:00.000Z",
                           "description": "new",
                           "is_active": true,
                           "image": "http://myserver.com/img/docset.png",
                           "bigimage": "http://myserver.com/img/bigdocset.png"
                        }    
                    ]
                 }
             }

### Retrive Docsets [GET]
+ Parameters
    + active (optional, bool) ... If you dont set any value all docset will be returned. In other case active o non active docsets returned.

+ Response 200

    [Docsets collection][]


