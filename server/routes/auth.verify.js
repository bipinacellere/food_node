const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
    let bearerToken = req.headers.authorization ? (req.headers.authorization).split('Bearer ') : '';

    if (!(bearerToken.length && bearerToken.length > 1)) {
        return res.status(401).send({
            message: "No token provided!"
        });
    }
    let token = bearerToken[1];

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;