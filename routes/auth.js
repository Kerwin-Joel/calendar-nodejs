// Rutas del Usuario / Auth
// host + /api/auth

const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const {createUser,loginUser,renewToken} = require('../controller/auth');
const { validateFiles } = require('../middlewares/file-validator');
const { validateJWT } = require('../middlewares/jwt-validator');


router.post( 
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La constraseña es obligatorias').not().isEmpty().isLength({min:6}),
        validateFiles
    ],
    loginUser ) 

router.post( 
    '/newUser',
    [   //Mis middlewares validator
        check('name','El nombre es obligatorio').notEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','La constraseña debe ser mayor a 6 caracteres').isLength({min:6}),
        validateFiles
    ],
    createUser )
    
router.get( '/renewToken',validateJWT,renewToken ) 

module.exports = router;

// db user:mern_user
//pas:bYfawyD6scP2aNVO