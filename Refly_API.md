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
                    ]
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
   + docset (string, `javascript`) ... Docset of the reference.
   + uri (string, `javascript_reference`) ... URI indentifier for a reference in a docset.

+ Model (application/hal+json)

   HAL+JSON representation of Reference Resource. In addition to representing its state in the JSON form it offers affordances in the form of the HAL links.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/references/javascript/javascript_reference" },
                    "curies": [
                        { 
                            "name": "rl",
                            "href": "http://refly.co/rels/{rel}",
                            "templated": true
                        }
                    ],
                   "rl:docset": { "href": "/api/docsets/javascript" },
                   "rl:ascendants": { "href": "/api/references/ascendants/javascript/javascript_reference" },
                   "rl:relatives": { "href": "/api/references/relatives/javascript/javascript_reference" }
               },
               "uri": "/javascript/javascript_reference",
               "name": "JavaScript reference",
               "type": "others",
               "content": "The content of the Reference's documentation"
            }

## Retrieve a Single Reference [GET]

+ Response 200

    [Reference][]




