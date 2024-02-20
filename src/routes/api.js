const express = require('express')
const routerAPI = express.Router()
const {
    register,
    login
} = require('../controllers/authController')

const {
    postCreateUserAPI,
    updateUserAPI
} = require('../controllers/userController') 

// auth
routerAPI.post('/auth/register', register)
routerAPI.post('/auth/login', login)

// User
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', updateUserAPI)

module.exports = routerAPI