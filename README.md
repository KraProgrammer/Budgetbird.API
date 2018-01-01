


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
            message: 'Successfully removed journey',
            journey: resultObject
        }
      ```
  



- **Error Response:**

  
    * **Code:** 500<br>**Content:**
      `{
message: 'Error Message'
}`
  



<br>


## signup Route ##


  #### Used to signup new users ####



* **URL**

  
    `/user/signup`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `email`
  
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
}`
  



<br>


## login Route ##


  #### Used to login users ####



* **URL**

  
    `/user/login`
  



* **Method:**

  
    `POST`
  





- **Data Params**

  
    `email`
  
    `password`
  



- **Success Response:**

  
    - **Code:** 201<br>**Content:**
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