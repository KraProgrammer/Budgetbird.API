


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