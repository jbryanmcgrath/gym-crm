const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
        token = token
            .split(' ')
            .pop()
            .trim();
        }
    
        // if no token, return request object as is
        if (!token) {
        return req;
        }
    
        try {

        // decode and attach user data to request object
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
<<<<<<< HEAD
        req.employee = data;
=======
        req.user = data;

>>>>>>> c2382ee3d3ca05a350bf59dee896fc6ba787594f
        } catch {
        console.log('Invalid token');
        }
    
        // return updated request object
        return req;
    },

    
    signToken: function({ email, _id }) {
        const payload = { email, _id };


        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};
