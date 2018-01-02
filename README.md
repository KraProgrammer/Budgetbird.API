


## Get Journeys Route ##


  #### Used to retrieve all journeys ####



* **URL**

  
    `/journey`
  



* **Method:**

  
    `GET`
  







- **Success Response:**

  
    - **Code:** 200<br>**Content:**
      ```
        {
            "count": 5,
            "journeys": [{
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


## PATCH Journey Details Route ##


  #### Used to update all details to given journey ####



* **URL**

  
    `/journey/:journeyId`
  



* **Method:**

  
    `PATCH`
  







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


## PATCH user Details Route ##


  #### Used to update all details to given user ####



* **URL**

  
    `/user/:userId`
  



* **Method:**

  
    `PATCH`
  





- **Data Params**

  
    `email`
  
    `username`
  



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