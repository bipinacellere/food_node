# Backend App
Lunch is important and knowing our lunch choices is even more so. While our office manager publishes a paper copy of the food truck schedule once a month, we’d like this service to be available digitally, so we can choose our lunch from the comfort of our desks. For an internal hackathon, you’ve been asked to write a server-and-UI into which we can manually add the food trucks for each month, and access today's choices. 

## Embold Badges
![Quality Gate](https://app.embold.io/api/badges?repositoryUid=8d7fe2ea8eb1bde4fbf5737fe2e295ee&type=qualityGate)
![Rating](https://app.embold.io/api/badges?repositoryUid=8d7fe2ea8eb1bde4fbf5737fe2e295ee&type=rating)

# Scope of application
1. Data entry of the food trucks for each day.
2. Each food truck only require a name and a date.
3. Editing food trucks.
4. Listing today’s Food trucks.

# Technology stack & Prerequisites
1. Node.js (Tested on version 16)
2. Postgres (Tested on version 13)

#### Schema
    CREATE TABLE IF NOT EXISTS public.truck_details
    (
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
        name character varying COLLATE pg_catalog."default" NOT NULL,
        arrival_date date NOT NULL,
        created_dt time without time zone,
        updated_dt time without time zone,
        CONSTRAINT truck_details_pkey PRIMARY KEY (id)
    )

### Application Architecture
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/10547276/246676813-e861c59c-404e-41ab-8db3-adb4155cc65c.png)

### Ports
1. Node.js app is running on port 3000 using command `node app.js`
2. Postgres default port is 5432

## REST API

### Get all food trucks
    GET : /api/food
#### Request
    curl --location --request GET 'http://localhost:3000/api/food'
#### Response
    Status: 200 OK
    [
        {
            "id": "22",
            "name": "The Food Stop",
            "arrival_date": "2023-06-18"
        },
        {
            "id": "21",
            "name": "Best Bites in Town",
            "arrival_date": "2023-06-18"
        },
        {
            "id": "20",
            "name": "Gimme Grub",
            "arrival_date": "2023-06-09"
        },
        {
            "id": "19",
            "name": "Hunger Machine",
            "arrival_date": "2023-06-29"
        },
        {
            "id": "18",
            "name": "Say Cheese",
            "arrival_date": "2023-06-29"
        }
    ]

### Get single food truck
    GET : /api/food/:id
#### Request
    curl --location --request GET 'http://localhost:3000/api/food/22'
#### Response
    Status: 200 OK
    {
        "id": "22",
        "name": "The Food Stop",
        "arrival_date": "2023-06-18"
    }

### Add new food truck
    POST : /api/food
#### Request
    curl --location --request POST 'http://localhost:3000/api/food' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "Pizza on wheel",
            "arrival_date": "2023-06-20T18:30:00.000Z"
        }'
#### Response
    Status: 201 OK
    {"message":"Item added successfully!"}

### Update food truck
    PUT : /api/food/:id
#### Request
    curl --location --request PUT 'http://localhost:3000/api/food/23' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "Pizza & Pasta on wheel",
            "arrival_date": "2023-06-20T18:30:00.000Z"
        }'
#### Response
    Status: 200 OK
    {"message":"Item Updated successfully!"}

### Delete food truck
    DELETE : /api/food/:id
#### Request
    curl --location --request DELETE 'http://localhost:3000/api/food/23' 
#### Response
    Status: 200 OK
    {"message":"Item deleted successfully!"}
