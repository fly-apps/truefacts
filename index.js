const express = require("express");
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require("sequelize");
var parse = require("pg-connection-string").parse;

const connectionString = process.env.DATABASE_URL;

connector = parse(connectionString);

const sequelize = new Sequelize(
    connector.database,
    connector.user,
    connector.password,
    {
        dialect: "postgres",
        host: connector.host,
        dialectOptions: {
            ssl: { sslmode: "require", rejectUnauthorized: false },
        },
    }
);


(async () => {
    try {
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect:", error);
            process.exit(1);
        }
        const Fact = await sequelize.define("Fact", {
            about: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            details: {
                type: DataTypes.STRING,
            },
        });

        const app=new express();
        const port=8080;

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.post("/fact", async (req,res) => {
            const newfact=req.body;
            const fact = await Fact.create(newfact);
            res.status(200).json({id:fact.id})
        });

        app.get("/facts", async (req,res) => {
            var facts = await Fact.findAll();
            res.status(200).json(facts)
        });
        
        app.get("/fact/:id", async (req,res) => {
            var facts = await Fact.findAll({ where: {
                id: req.params.id
            }})
            res.status(200).json(facts)
        });

        app.get("/facts/about/:thing", async (req,res) => {
            var facts = await Fact.findAll({ where: {
                about: req.params.thing
            }})
            res.status(200).json(facts)
        });

        app.listen(port, "0.0.0.0");
    } catch (error) {
        console.error("Error caught:", error);
    }
})();

