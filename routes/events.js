const express = require('express');
const { check } = require('express-validator');
const { deleteEvent, updateEvent, getEvents, createEvent } = require('../controller/events');
const { isDate } = require('../helpers/isDate');
const { validateFiles } = require('../middlewares/file-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = express.Router();
// router 
// /api/events

router.use(validateJWT)// all requests must go through this middleware 


router.get( '/',getEvents ) 
router.post( '/',
    [
        check('title','El titulo es obligatorio').notEmpty(),
        check('start','La fecha de inicio es obligatorio').custom(isDate),
        check('end','La fecha de fin es obligatorio').custom(isDate),
        validateFiles
    ],
    createEvent) 
router.put( '/:id',updateEvent ) 
router.delete( '/:id',deleteEvent ) 

module.exports = router;
