# truefacts

A Postgres-backed(with Sequelize) REST API in Node.js

A simple demo for the how to use Heroku databases with Fly apps.

## The API

POST to /fact with { about:"subjectkeyword", details:"The fact you want recorded" }
returns JSON with the id number for the record.

GET /facts returns all facts known

GET /fact/:id returns the fact with that id number

GET /facts/about/:thing searches for any records with an about field matching :thing and returns them.

Requires a connection string `DATABASE_URL` in the environment.

## Setting up

Clone the respository

run `fly init --builtin node`

Select name, org and port (leave at 8080)

Once complete, run `fly deploy`

The application will deploy to appname.fly.dev

Add some facts:

```
curl --request POST \
  --url https://yourappname.fly.dev/fact \
  --header 'content-type: application/json' \
  --data '{ "about": "shrimps", "details": "The Mantis Shrimp has vicious jaws" }'
  
curl --request POST \
  --url https://yourappname.fly.dev/fact \
  --header 'content-type: application/json' \
  --data '{ "about": "owls", "details": "Baby Owls are called owlettes" }'
```

Retrieve some facts:

```
curl --request GET \
  --url https://yourappname.fly.dev/facts
```

