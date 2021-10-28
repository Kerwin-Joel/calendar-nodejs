const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const createUser = async(req, res)=>{

    const newUserRequest = new User(req.body)

    try {
        const emailRequest = newUserRequest.email
        const findUser = await User.findOne({email:emailRequest})

        //Antes de guardar en bd se debe encryptar el password
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(newUserRequest.password, salt);
        newUserRequest.password = hash;

        if ( !findUser ) {
            const newUserResponse = await newUserRequest.save()
            
            //Generate JWT 
            const token = await generateJWT(newUserRequest._id, newUserRequest.name)
            return res.status(201).json({
                ok:true,
                message:'create user',
                uid:newUserResponse.uid,
                name:newUserResponse.name,
                token
            })
        }
        return res.status(400).json({
            ok:false,
            message:'user already exists',
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:false,
            message:'habla con el administrator',
        })
    }
    
}
const loginUser = async(req, res)=>{
    const { email, password } = req.body
    try {
        const findUser = await User.findOne({email})
        const {name, id:uid} = findUser
        const token = await generateJWT(findUser._id, findUser.name)

        if (!findUser) {// find user dont exist
            return res.status(400).json({
                ok:false,
                message:'email or password invalid',
                token
            })
        }
        //Compare password
        const loadPassword = bcryptjs.compareSync(password.toString(), findUser.password);
        if (loadPassword) {
            return res.status(200).json({
                ok:true,
                message:'login successful',
                uid,
                name,
                token
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Email or password dont exist',
        })
    }
}
const renewToken = async(req, res)=>{

    const token = await generateJWT(req.uid, req.name)
    res.json({
        ok:true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}