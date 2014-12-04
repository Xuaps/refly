FORMAT: 1A

# Refly API
Refly API is a **references library** service.

# Refly API Root [/api]
Refly API entry point.

This resource offers the initial API affordances in the form of HAL links.

## Retrive Entry Point [GET]

+ Response 200 (application/hal+json)
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
                    "rl:references": { "href": "/api/references"},
                    "rl:get-reference": { "href": "/api/references/{docset}/{uri}"},
                    "rl:search-references": { "href": "/api/references{?name}"}
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

+ Model (application/hal+json)

   HAL+JSON representation of Reference Resource. In addition to representing its state in the JSON form it offers affordances in the form of the HAL links.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/slash/test.html" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ],
                   "rl:docset": { "href": "/api/docsets/slash" },
                   "rl:ascendants": { "href": "/api/references/ascendants/slash/test.html" },
                   "rl:relatives": { "href": "/api/references/relatives/slash/test.html"}
               },
               "uri": "/slash/test.html",
               "name": "Slash reference",
               "type": "others",
               "content": "The content of the Reference's documentation"
            }

### Retrieve a Single Reference [GET]

+ Response 200

    [Reference][]

##References collection [/api/references{?name}]
A collection of References.

The References Collection resource  **embeds* *Reference Resources* in the Refly API.

+ Model (application/hal+json)
    
    HAL+JSON representation of References Collection Resource. The Reference resource in collections are embedded. Note the embedded References resource are incomplete representation of the Reference in question. Use the respective Reference link  to retrive its full representation.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/references" }
                },
                "_embedded": {
                    "references": [
                        {
                            "_links": {
                               "self": { "href": "/api/reference/slash/test.html"}
                            },
                            "uri": "/slash/test.html",
                            "name": "search",
                            "type": "others",
                            "docset_name": "slash"
                        }    
                    ]
                 }
             }

### Search References [GET]
+ Parameters
    + name (optional, string) ... Pattern to find matching references. Only References whose names contain this pattern are returned. Only 20 first coincidences are returned.

+ Response 200

    [References collection][]




