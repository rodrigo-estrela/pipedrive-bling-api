# Pipedrive Bling Integration API

Integration between Pipedrive and Bling platforms. (The integration searches for opportunities with status equal to won in Pipedrive, then insert them as order in Bling).

### Built With
- NojeJS
- Express
- MongoDB

## Getting Started

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/rodrigo-estrela/pipedrive-bling-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
Note: all the needed keys were intentionally committed to facilitate the evaluation of the project.


## Implementation Details
The main challenge for this project was to decide the logic on how to get the new deals with won status from Pipedrive. I tackled this challenge with two bondary conditions:
  1. Add a Deal Custom field
    I used the Pipedrive API to implement a Deal Custom Field called Bling. The intent of this field is to control if the deal was already successfully sent to Bling API.

  2. Add a custom filter
    I used the Pipedrive API to implement a Deal custom filter. The filter criteria is: deals with custom field bling not equal to 'posted'. See bellow the json template for the filter creation:
    ```js
    {
        "name": "deals-won-bling-not-posted",
        "type": "deals",
        "conditions": {
            "glue": "and",
            "conditions": [{
                    "glue": "and",
                    "conditions": [{
                        "object": "deal",
                        "field_id": "12486",
                        "operator": "!=",
                        "value": 11,
                        "extra_value": null
                    }]
                },
                {
                    "glue": "or",
                    "conditions": [{
                        "object": "deal",
                        "field_id": "12486",
                        "operator": "!=",
                        "value": 11,
                        "extra_value": null
                    }]
                }
            ]
        }
    }
    ```
My integration has a background job to make get requests to pipedrive periodically using this custom filter.
The deals then are parsed to xml and posted to bling api. After that they are consolidated by day and persisted in a MongoDB collection.

## Endpoints
### GET /deals
Returns deals posted to bling, consolidated by day:
Parameters | Comments
------------- | -------------
skip | Optional - Pagination start. Default = 0
limit  | Optional - Items per page. Max = 100
