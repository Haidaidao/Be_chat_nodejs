const User = require('../models/user') 
const { 
    validateEmail
} = require('../services/valid')


const loginService = async (data) => {
    
    let result = null
    result = await User.findOne({email : data.email})
    
    if(result==null)
        return null
    else {
        
        if(await result.validatePassword(data.password)) 
            return result
    }
}

const registerService = async (data) => {
    let newUser = new User(); 
    console.log(newUser)
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

module.exports = {
    loginService,
    registerService
}