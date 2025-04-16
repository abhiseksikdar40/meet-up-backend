const mongoose = require("mongoose")
require('dotenv').config()

const mongoUrl = process.env.MONGODB

const initializeMeetUpData = async () => {
    await mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Database Connected.")
    })
    .catch ((error) => {
        console.log("Failed To Connect Database!", error)
    })
}

module.exports = { initializeMeetUpData }