# Pipedrive Bling Integration API

Integration between Pipedrive and Bling platforms. (The integration searches for opportunities with status equal to won in Pipedrive, then insert them as order in Bling).

### Built With
- NodeJS
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

## Implementation Details
The main challenge for this project was to decide the logic on how to get the new deals with won status from Pipedrive. I tackled this challenge with two bondary conditions:
  1. Add a Deal Custom field
    I used the Pipedrive API to implement a Deal Custom Field called Bling. The intent of this field is to control if the deal was already successfully sent to Bling API.

  2. Add a custom filter
    I used the Pipedrive API to implement a Deal custom filter. The filter criteria is: deals with custom field bling not equal to 'posted'.

My implementation has a background job to make get requests to pipedrive API periodically using this custom filter.
The deals then are parsed to xml and posted to bling api. After that, put requests are made to Pipedrive API, updating the value of the custom field to 'posted'.
Finally deals are aggregated by day and persisted in a MongoDB collection.

## Configurations
All the needed keys were intentionally committed to facilitate the evaluation of the project without the need to you going through the process of creating the custom field and custom filter on your own pipedrive account. Please feel free to use it.
 - Pipedrive api_token: 2af7e5b906d3097ddc2a0df250569d285ae74c3e
 - Bling apikey: 14ac9083cd83f4b6440d639c982862a2159671474573a31cd45a647018d0567f955089b5


If you want to test the API on your own Pipedrive and Bling accounts, please, make sure to:
  - Update /src/modules/integration-api/apis/config/index.js with your baseURL and keys for your Pipedrive and Bling account.
  - Create a Deal custom field at Pipedrive:
    * Field Name: Bling
    * Field Type: Single Option
    * Options: posted

    Then updated /src/modules/integration-api/apis/config/index.js
      ```js
      customFields: {
        Bling: {
          id: 12486, // update with the id of your custom field
          key: 'ce3f8df377f5c6edc35ef0ecf69973865481fbd4', // update with th key of your custom field
        },
      },
      ```
  - Create a custom filter at Pipedrive:
    Make a post request to the endpoint /filters with the following json data:
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
                          "field_id": "12486", // id of the created custom field
                          "operator": "!=",
                          "value": 11,  // id of the option for label posted
                          "extra_value": null
                      }]
                  },
                  {
                      "glue": "or",
                      "conditions": [{
                          "object": "deal",
                          "field_id": "12486", // id of the created custom field
                          "operator": "!=",
                          "value": 11, // id of the option for label posted
                          "extra_value": null
                      }]
                  }
              ]
          }
      }
      ```

    Then update /src/modules/integration-api/apis/config/index.js
      ```js
      filters: {
        dealsWonBlingNotPosted: 23, // id of your custom filter
      },
      ```

## Endpoints
### GET /v1/sales
Returns deals posted to bling, consolidated by day:
Parameters | Comments
------------- | -------------
skip | Optional - Pagination start. Default = 0
limit  | Optional - Items per page. Max = 100

## Alternative solution
An alternative solution for this integration would be use webhooks. In my opinion, this would be a more performante solution, but I did not followed this path because one of the requirements specify that the integration must search the deals.

