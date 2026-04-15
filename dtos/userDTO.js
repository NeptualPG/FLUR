const userDTO = (user) => {
    return {
        id: user._id,
        name: user.name,
        age: user.age,
        email: user.email
    };
}

module.export = userDTO;