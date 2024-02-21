const User = require('../models/user') 
const { 
    validateEmail
} = require('../services/valid')

const createUserService = async (data) => {
    let newUser = new User(); 
 
    newUser.username = data.username, 
    newUser.email = data.email,
    newUser.password= data.password

    let checkUser = await User.findOne({username: newUser.username})
    
    if(checkUser==null && validateEmail(newUser.email)) {
        await newUser.setPassword(data.password)
        newUser.save()
        return newUser
    }
    else {
        return null
    }
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