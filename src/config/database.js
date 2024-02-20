const mongoose = require('mongoose')
require('dotenv').config


const connection = async () => {
  try {
    const option = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME
    }
    await mongoose.connect(process.env.DB_HOST, option);
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log('Error connect mongo')
  }
}


module.exports = connection