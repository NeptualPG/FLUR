const validateUser = (data) => {

    const {name, age, email, password} = data;
    
    if(!name || typeof name !== "string"){
        return "Name is required"
    }

    if(!age || typeof age !== "number"){
        return "Age is required"
    }

    if(!email || typeof email !== "string"){
        return "Email is required"
    }

    if(!password || typeof password !== "string" || password.length < 6){
        return "Password of at least 6 characters is required"
    }

    return null;
    
}

module.exports = validateUser;