# Authentication and user profile service

This microservice is responsible for verifying the identity of users as part of an access control system. It uses JWT based stateless authentication mechanism to issue tokens on successful authentication. 

It handles following endpoints:

**login**
```javascript
// Endpoint: /login/
// Handles login requests (HTTP POST) from the frontend

// sample request body
request.body = {
    "email":"user1@gmail.com",
    "password":"password"
}

// sample response body
response.body= {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxMzQ2NjUxNjQ1MTQwIiwiaWF0IjoxNjY2MjM3NTI5LCJleHAiOjE2NjYyNDExMjl9.2sfbpuKls_-HGiXj3n9Td6VIY9VkvIIkF4-sYpMcbsc"
}
```

**signup**
```javascript
// Endpoint: /signup/
// Handles signup requests (HTTP POST) from the frontend

// sample request body
request.body = {
    "email":"user2@gmail.com",
    "password":"password",
    "first_name":"user2",
    "last_name":"lastname2",
    "cellphone_no":"+19999999999"
}

// sample response body
response.body= {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI0ODAyOTY2MzU4MTkiLCJpYXQiOjE2NjYyMzg1NTYsImV4cCI6MTY2NjI0MjE1Nn0.2jJz0hYIMHUEvSUXhGZrNiQ_-mqfb5GZo72VWdcKakk"
}
```

**profile**
```javascript
// Endpoint: /profile/
// Handles profile retrieval requests (HTTP GET) from the frontend

// sample request body
// Empty request body but needs an HTTP header 'token' with a valid JWT token value

{'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI0ODAyOTY2MzU4MTkiLCJpYXQiOjE2NjYyMzg1NTYsImV4cCI6MTY2NjI0MjE1Nn0.2jJz0hYIMHUEvSUXhGZrNiQ_-mqfb5GZo72VWdcKakk'}

// sample response body
response.body= {
    "first_name": "user2",
    "last_name": "lastname2",
    "user_email": "user2@gmail.com",
    "cellphone_no": "+19999999999"
}
```

**profileupdate**
```javascript
// Endpoint: /updateprofile/
// Handles update profile requests (HTTP POST) from the frontend

// needs an HTTP header 'token' with a valid JWT token value
{'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI0ODAyOTY2MzU4MTkiLCJpYXQiOjE2NjYyMzg1NTYsImV4cCI6MTY2NjI0MjE1Nn0.2jJz0hYIMHUEvSUXhGZrNiQ_-mqfb5GZo72VWdcKakk'}

// sample request body
request.body = {
    "first_name": "user2",
    "last_name": "lastname200",
    "user_email": "user2@gmail.com",
    "cellphone_no": "+19999955555"
}

// sample response body
response.body= {
    "message": {
        "first_name": "user2",
        "last_name": "lastname200",
        "user_email": "user2@gmail.com",
        "cellphone_no": "+19999955555"
    }
}
```