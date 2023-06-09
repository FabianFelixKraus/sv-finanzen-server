﻿require("dotenv").config()

const express = require("express");
const app = express()
const mongoose = require("mongoose")
const {request} = require("express");

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.error("Database connection error:", error))

app.use(express.json())

const transactionsRouter = require("./routes/transactions")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // update with your client's origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/transactions", transactionsRouter)

const port = 3000
app.listen(port, () => console.log(`Server started and listening on port: ${port}`))