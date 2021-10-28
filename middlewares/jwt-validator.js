const express = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    const token = req.header('x-token')
    
    if (!token) {
        return res.status(400).json({
            ok: false,
            message: 'there isnt token'
        })
    }
    try {
        
        const payload = jwt.verify(token,process.env.SECRET_JWT_SEDD)
        req.uid = payload.uid
        req.name = payload.name

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            ok: false,
            message: 'token invalid'
        })
    }

    next();
}

module.exports = {
    validateJWT
}