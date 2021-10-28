const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//crear el servidor de express
const app = express()

//DATABASE
dbConnection()

//USE CORS
app.use(cors())


//Directorio publico
//app.use esto son middlewares
app.use( express.static('./public') )

//Esto nos ayuda a parsear el cuerpo que recibimos a un json y asi poblar el body y leer data que se nos envio 
app.use(express.json())

//Rutas
    //auth
app.use('/api/auth',require('./routes/auth'))
    //event
app.use('/api/event',require('./routes/events'))


//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})