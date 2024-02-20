const User = require('../models/user') 
const {
    createUserService,
    updateUserService
} = require('../services/userService')

const postCreateUserAPI = async(req, res) => {
    const data = req.body

    let result = await createUserService(data)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when create user"
    })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

const updateUserAPI = async(req,res) => {
    let result = await updateUserService(req.body)

    if(result == null) 
        return res.status(400).json({
            error: 1,
            msg: "Error when update user"
        })

    return res.status(200).json({
        error: 0,
        data: result
    })
}

module.exports = {
    postCreateUserAPI,
    updateUserAPI
}