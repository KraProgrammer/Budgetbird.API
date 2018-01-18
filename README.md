


## Get Journeys Route ##


  #### Used to retrieve all journeys ####



* **URL**

  
    `/journey`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "count": 5,
            "journeys": [{
                "journeyid": number,
                "startdate": date,
                "enddate": date,
                "description": text,
                "destination": text,
                "currency": number,
                "request": {
                    "type": "GET",
                    "url": "http://localhost:3000/journey/2"
                }
            }
            }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## New Journey Route ##


  #### Used to create a new journey ####



* **URL**

  
    `/journey`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `name`
  
    `start`
  
    `end`
  
    `description`
  
    `destination`
  
    `currency`
  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 201<br>**Content:**
      ```
        {
            message: 'Successfully created journey',
            createdJourney: resultObject,
            request: {
                type: 'GET',
                url: http: //localhost:3000/journey/2
            }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



- **Sample Call:**

  ```javascript
    POST / journey HTTP / 1.1
    Host: localhost: 3000
    Content - Type: application / json
    Cache - Control: no - cache
    Postman - Token: 5e8b8445 - 7615 - aa65 - ca72 - 21fc99f64b67

    {
        "name": "test2",
        "start": "2018-01-02",
        "end": "2018-01-07",
        "description": "desc2",
        "destination": "Wien",
        "currency": 1
    }
  ```

<br>


## Get Journey Details Route ##


  #### Used to retrieve all details to given journey ####



* **URL**

  
    `/journey/:journeyId`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully retrieved journey details',
            journey: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## Add User to Journey ##


  #### Used to add a user to a Journey ####



* **URL**

  
    `/journey/:journeyId/user`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `(Header) Bearer token`
  
    `userid`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully added user to journey',
            journey: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## Remove user from journey ##


  #### Used to remove a user from a Journey ####



* **URL**

  
    `/journey/:journeyId/user`
  



* **Method:**

  
    `DELETE`
  





- **Data Params**

  
    `(Header) Bearer token`
  
    `userid`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully remove user from journey'
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## PATCH Journey Details Route ##


  #### Used to update all details to given journey ####



* **URL**

  
    `/journey/:journeyId`
  



* **Method:**

  
    `PATCH`
  





- **Data Params**

  
    `Array of properties [{"propname": "...", "value": "..."}])`
  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully updated journey details',
            journey: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



- **Sample Call:**

  ```javascript
    PATCH / journey / 1 HTTP / 1.1
    Host: localhost: 3000
    Content - Type: application / json
    Cache - Control: no - cache
    Postman - Token: a1dbe3fe - 9534 - 4bc4 - 8d27 - 2207640a841f

    [{
        "propName": "journeyname",
        "value": "change name"
    }, {
        "propName": "startdate",
        "value": "2019-01-02"
    }, {
        "propName": "enddate",
        "value": "2019-01-06"
    }, {
        "propName": "description",
        "value": "change desc"
    }, {
        "propName": "destination",
        "value": "chaange dest"
    }, {
        "propName": "defaultcurrencyid",
        "value": "1"
    }]
  ```

<br>


## Delete Journey Details Route ##


  #### Used to Delete a given Journey ####



* **URL**

  
    `/journey/:journeyId`
  



* **Method:**

  
    `DELETE`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "message": "Successfully removed journey",
            "rowCount": 1
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## Signup Route ##


  #### Used to signup new users ####



* **URL**

  
    `/user/signup`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `email`
  
    `username`
  
    `password`
  



- **Success Response:**

  
    - **Code:** 201<br>**Content:**
      ```
        {
            token, message: 'User created'
        }
      ```
  



- **Error Response:**

  
    * **Code:** 409<br>**Content:**
      `{
message: 'Mail exists'
},{
message: 'Missing argument'
},{
message: 'Error Message'
}`
  
    * **Code:** 422<br>**Content:**
      `{
message: 'Mail exists'
},{
message: 'Missing argument'
},{
message: 'Error Message'
}`
  
    * **Code:** 500<br>**Content:**
      `{
message: 'Mail exists'
},{
message: 'Missing argument'
},{
message: 'Error Message'
}`
  



<br>


## Login Route ##


  #### Used to login users ####



* **URL**

  
    `/user/login`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `email`
  
    `password`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            token, message: 'Auth successful'
        }
      ```
  



- **Error Response:**

  
    * **Code:** 401<br>**Content:**
      `{
message: 'Auth failed'
}`
  



<br>


## User Details Route ##


  #### Used to retrieve users details ####



* **URL**

  
    `/user/:userId`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully retrieved user details',
            user: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: err.message
},{
message: No token provided.
}`
  
    * **Code:** 401<br>**Content:**
      `{
message: err.message
},{
message: No token provided.
}`
  



<br>


## User Details Route (Email) ##


  #### Used to retrieve users details using email
Used for adding member to journey ####



* **URL**

  
    `/user/search/:email`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully retrieved user details',
            user: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: err.message
},{
message: No token provided.
}`
  
    * **Code:** 401<br>**Content:**
      `{
message: err.message
},{
message: No token provided.
}`
  



<br>


## PATCH user Details Route ##


  #### Used to update all details to given user ####



* **URL**

  
    `/user/:userId`
  



* **Method:**

  
    `PATCH`
  





- **Data Params**

  
    `email`
  
    `username`
  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully retrieved user details',
            user: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: err.message
}`
  



<br>


## Delete User Details Route ##


  #### Used to delete a given User ####



* **URL**

  
    `/user/:userId`
  



* **Method:**

  
    `DELETE`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "message": "Successfully removed user",
            "rowCount": 1
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## Transaction Route ##


  #### Used get all transaction of a journey ####



* **URL**

  
    `/journey/:journeyId/transaction`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token *`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "count": 1,
            "transactions": [{
                "transactionID": 1,
                "journeyId": 5,
                "timestamp": "2018-01-09T19:14:33.401Z",
                "currencyId": 1,
                "categoryId": 1,
                "description": "desc1",
                "data": [{
                    "userid": 1,
                    "amount": 10
                },
                {
                    "userid": 2,
                    "amount": 20
                }],
                "tsum": 30
            }],
            "sum": 30
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## New Transaction Route ##


  #### Used to create a new transaction ####



* **URL**

  
    `/journey/:journeyId/transaction`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `description`
  
    `currencyid`
  
    `categoryid`
  
    `partition = [{"userid": number, "amount": number}]`
  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 201<br>**Content:**
      ```
        {
            message: 'Successfully created transaction',
            createdTransaction: resultObject,
            request: {
                type: 'GET',
                url: http: //localhost:3000//journey/:journeyId/transaction
            }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## Transaction Detail Route ##


  #### Used get all details to a transaction of a journey ####



* **URL**

  
    `/journey/:journeyId/transaction/:transactionid`
  



* **Method:**

  
    `GET`
  





- **Data Params**

  
    `(Header) Bearer token *`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "transactionID": 1,
            "journeyId": 5,
            "timestamp": "2018-01-09T19:14:33.401Z",
            "currencyId": 1,
            "categoryId": 1,
            "description": "desc1",
            "data": [{
                "userid": 1,
                "amount": 10
            },
            {
                "userid": 2,
                "amount": 20
            }],
            "tsum": 30
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## PATCH transaction Details Route ##


  #### Used to update all details to given transaction ####



* **URL**

  
    `/journey/:journeyId/transaction/:transactionid`
  



* **Method:**

  
    `PATCH`
  





- **Data Params**

  
    `Array of properties [{"propname": "...", "value": "..."}])`
  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            message: 'Successfully updated transaction details',
            transaction: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



- **Sample Call:**

  ```javascript
    [{
        "propName": "currencyId",
        "value": "2"
    },
    {
        "propName": "categoryId",
        "value": "2"
    },
    {
        "propName": "description",
        "value": "new descr"
    }]
  ```

<br>


## Delete Transaction Route ##


  #### Used to Delete a given Transaction (No Admin-rights needed) ####



* **URL**

  
    `/journey/:journeyId/transaction/:transactionid`
  



* **Method:**

  
    `DELETE`
  





- **Data Params**

  
    `(Header) Bearer token`
  



- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "message": "Successfully removed transaction",
            "rowCount": 1
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>