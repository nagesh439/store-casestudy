# store-casestudy



# How to run this project
    - Should have node and mongodb installed in the system and hit npm install

# folder structure

    - Project starts with server js which contains creation of server and connction to mongo db
    - Project has has 3 main folders Models, Routes, Middleware
    - Models : Defines structure of our documents like users,outlets,brands,categories and menu items
    - Routes : Contains diffrent apis to manage stores and its data
    - Middleware : it authenticates the admin who is managing data 


# Test Cases

<!-- user -->
    /createUsers:  -POST
    - should contain all these fields in the body name, email, password, secretKey, superAdmin
    - account should not get created with invalid email , email should be given crreclt in email adress format for eg:-         abc@gmai.com
    - password should be min 6 characters 
    

    /user/login -POST
    - Should give email and password details inside body for this api


<!-- Outlet -->
    /createOutlet: -POST
    - Only aythenticated user can use this api,
    - Fields like  outletName,country,city,outletAddress,phNo,status,email are mandatory to create outlet
    - if any of these fields are not provided error will be thorwn



<!-- brands -->
    /createBrand:  - POST
    - Only aythenticated user can use this api,
    - should contain valid title and status inside body 


<!-- Categories -->
    /createCat - POST
    - Only aythenticated user can use this api,
    - should contain outletid to which this outlet it is getting created
    -  should contain brand to which this brand is related to 
    - title, status and type  values are also must be present in the body
    - if any of the above fields are obsent api should throw an error


    /getCategories - GET
        - to get the proper result should provide category id in the query parameters
            for eg:-  /getCategories?id=60b9d38e963df3c1ba1be910 
        
        

<!-- Items -->
    /createItem- POST
    - Only aythenticated user can use this api,
    - should contain outletid to which this outlet it is getting created
    - should contain categoryId to which this category it is getting created
    -  should contain brand to which this brand is related to 
    -  title,cost,status,values are also must be present in the body

    /updateItems- POST
     - Only aythenticated user can use this api,
     - type Validation will be performed over the body coming from user if they final error will be thrown


    /getItems - GET
        - to get Items for that particular outlet u need to send outlet id as a query parameter
            for eg:-  /getItems?id=60b9d38e963df3c1ba1be910      

   

