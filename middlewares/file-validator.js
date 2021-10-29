const { validationResult } = require('express-validator')


const validateFiles = (req, res, next) => {

    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            ...errors.mapped()
        })
    }
    next();
}

module.exports ={
    validateFiles
}