const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }
    const token = authHeader?.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware,
};
