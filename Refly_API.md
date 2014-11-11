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





