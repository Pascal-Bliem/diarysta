const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // check if there's no token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization failed." })
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, config.get("jwtsecret"));
        req.user = decoded.user;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }

}