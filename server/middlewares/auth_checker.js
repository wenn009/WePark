const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const Users = require('../models').Users;

module.exports = (req, res, next) => {
    console.log('auth req: ' + req.headers);
    
    if(!req.headers.authorization){
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('auth token : ' + token);
    
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if(err) { return res.status(401).end(); }
        
        const email = decoded.sub;

        //return the user
        Users.findOne({
            where: {
                Email: email
            }
        }) .then((user) => {
            if(!user){
                return res.status(401).end();
            }
            return next();
        });       
    });
};
