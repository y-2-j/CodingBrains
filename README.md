# GyManager

A Platform for young coders to test Coding, DS, Algo Skills by organizing and participating in contests.
Created using MongoDB Database.

Hosted Live at: [https://codingbrains.herokuapp.com](https://codingbrains.herokuapp.com)


## Installation

```
git clone https://github.com/anuj-aggarwal/CodingBrains.git
cd CodingBrains
npm install
```

## Setup

Create a MongoDB user <DB_USER> with <DB_PASSWORD>

Create a secret.json file in this format:
```json
{
    "SERVER": {
        "HOST": "localhost",
        "PORT": "<PORT_NUMBER>"
    },
    "DB": {
        "HOST": "localhost",
        "PORT": 27017,
        "USERNAME": "<DB_USER>",
        "PASSWORD": "<DB_PASSWORD>",
        "NAME": "<DB_NAME>"
    },
    "SESSION_SECRET": "<SESSION_SECRET>",
    "COOKIE_SECRET": "<COOKIE_SECRET>"
}
```

## Running

```
npm start
```

### Running MongoDB database
Make sure that MongoD is running. To start MongoDB Daemon, run these commands on a separate terminal:
```
mkdir data
mongod --dbpath=./data
```

## Built With

* [Express](https://expressjs.com/) - The Node.js Framework for HTTPS Server
* [Mongoose](http://mongoosejs.com/) - Node.js ORM for MongoDB Database
* [Passport](http://www.passportjs.org/) - Used for Authentication

## Authors

* [**Anuj Aggarwal**](https://github.com/anuj-aggarwal/)
* [**Kartik Narula**](https://github.com/y-2-j/)
* [**Bhargav Ram**](https://github.com/Bhargav-Ram/)
