const errorHandler = (res, err, status = 500, message) => {
    console.error(err);
    return res.status(status).json({ error : message || err.message || "Server error"});
}

module.exports = errorHandler;