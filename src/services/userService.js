const User = require('../models/user') 
const createUserService = async (data) => {
    let result = null

    if(data.username == null || data.password == null)
        return result 

    result = await User.create(data)
    return result
}

const updateUserService = async (data) => {
    let result = null
    if(data.username == null)
        return result 
    result = await User.updateOne({_id: data.id}, {...data})
    return result
}

module.exports = {
    createUserService,
    updateUserService
}