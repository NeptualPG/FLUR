const validateUser = (data) => {

    const {name, age} = data;
    
    if(!name || typeof name !== "string"){
        return "Name is required"
    }

    if(!age || typeof age !== "number"){
        return "Name is required"
    }

    return null;
    
}