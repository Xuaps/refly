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
                    "rl:references": { "href": "/api/references?{name,docset,type,pagesize,page}", "templated": true},
                    "rl:types": { "href": "/api/types?{docset}", "templated": true},
                    "rl:docsets": { "href": "/api/docsets?{active}", "templated": true}
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
- content_anchor

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
               "content": "The content of the Reference's documentation",
               "content_anchor": ""
            }

### Retrieve a Single Reference [GET]

+ Response 200

    [Reference][]

+ Response 404

        {
            "message": "Error: Reference not found."
        }

## References collection [/api/references{?name,pagesize,page,docsets*,types*}]
A collection of References.

The References Collection resource  **embeds* *Reference Resources* in the Refly API.

+ Model (application/hal+json; charset=utf-8)
    
    HAL+JSON representation of References Collection Resource. The Reference resource in collections are embedded. Note the embedded References resource are incomplete representation of the Reference in question. Use the respective Reference link  to retrive its full representation.

    + Body

            {
                "_links": {
                   "self": { "href": "/api/references" },
                   "next": { "href": "/api/references?page=4&pagesize=30" },
                   "prev": { "href": "/api/references?page=2&pagesize=30" },
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
    + docsets (optional, string) ... Docset names. Only references in these docsets are returned.
    + types (optional, string) ... Reference's type. Only references os this type are returned.
    + pagesize = `20` (optional, number, `30`) ... Page size.
    + page = `1` (optional, number, `3`) ... Page number.

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

# Group User
A User resource in Refly API

## User [/api/users/current]
A single User object. It represents the current user in the application.  
The User resource has the following attributes:

- email

+ Model (application/hal+json; charset=utf-8)

   HAL+JSON representation of Docset Resource.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/users/current" }
               },
               "email": "test@refly.co"
            }

### Retrieve Current User [GET]

+ Response 200

    [User][]

+ Response 401

        {
            "message": "Unauthorized"
        }

# Group Session
A Session resource in Refly API

## Session [/api/session]
A single Session object. It represents the a user's session in Refly.
The Session resource has the following attributes:

- token

+ Model (application/hal+json; charset=utf-8)

   HAL+JSON representation of Docset Resource.

   + Body

            {
               "_links": {
                   "self": { "href": "/api/session" }
               },
               "token": "token"
            }

### Delete current Session [DELETE]

+ Response 200

        {"message": "Session deleted"}

+ Response 401

        {"message": "Unauthorized"}

##Group Settings
Application settings resource in *Refly API*

## Retrieve the user docsets selection [/api/settings]

+ Model (application/hal+json; charset=utf-8)

   HAL+JSON representation of Docset Resource.

   + Body

            {
                "_links": {
                   "self": { "href": "/api/settings" },
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

## Save user docsets selection[PUT]

## Modify docset selection [/api/settings?docsets={docsets}]
Parameter *docsets* (list of docset names separated by comma)

+ Response 200

        {"message": "Selection saved"}

+ Response 401

        {"message": "Unauthorized"}

# Group Subscription
Subscription resource of *Refly API*

## Subscription [/api/subscriptions/current]
A Subscription resource in Refly API. It represents the current users
subscription. The subscription object has the following attributes:

- payment_data (object)
    - last4 (string)
    - brand (string)
- plan (string)

+ Model (application/hal+json; charset=utf-8)

    HAL+JSON representation of Subscription Resource.

    + Body

            {
                "_links": {
                    "self": { "href": "/api/subscriptions/current" },
                    ],
                    "rl:user": { "href": "/api/users/current" }
                },
                "_embedded": {
                    "rl:form": {
                        "_links": {
                            "self": { "href": "/api/subscriptions/form" },
                            "curies": [
                                { 
                                    "name": "rl",
                                    "href": "http://refly.co/rels/{rel}",
                                    "templated": true
                                }
                            ],
                            "rl:target": { "href": "/api/subscriptions/form" }
                        },
                        "method": "PUT",
                        "type": "application/hal+json",
                        "class": "add-subscription"
                    }
                },
                "payment_data": {
                    "last4": "3243",
                    "brand": "visa"
                },
                "plan": "monthly"
            }

### Retrieve current Subscription [GET]

+ Request Get current Subscription (application/json)

    + Header

            Authentication: Bearer 03b21e72fb2e5d875173d475

+ Response 200

    [Subscription][]

## Subscription Form [/api/subscriptions/form]
A Subscription form resource in Refly API. It represents the form to create or
update a subscription.

### Create a Subscription [PUT]

+ Request Create a Subscription (application/json)

    + Header

            Authentication: Bearer 03b21e72fb2e5d875173d475

    + Attributes (object)
        + token (string)
        + plan (string)

    + Body

            { "token": "03b21e72fb2e5d875173d475",
              "plan": "anual" }

+ Response 200

    [Subscription][]
