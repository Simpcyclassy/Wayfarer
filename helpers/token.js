import jwt from 'jsonwebtoken';


export const createToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1hr'});
    return token;
};

export const decodeToken = (req, res, next) => {
    const token = req.headers.authorization || req.params.token || req.headers['x-access-token'] || req.body.token;
    
    if (!token){
        return res.status(403).json({
        status: 403,
        message: 'You need authorisations for this'
        });
    }
    return jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error){
        return res.status(401).json({
        status: 401,
        message: 'token is invalid'
        });
    }
        req.user = user;
        next();
    });
};