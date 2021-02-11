const express = require('express');
const app = express();
const cors = require('cors');


//middlewares : se ejecuta antes de llegar a las rutas
app.use(express.json());
app.use(cors());

// permite procesar datos enviados desde formularios
app.use(express.urlencoded({
    extended: false
}));

// rutas
app.use('/api', require('./routes/maestro.route'));
app.use('/api', require('./routes/estudiante.route'));
app.use('/api', require('./routes/tarea.route'));

const server = async () => {
    try {
        await app.listen(3000);
        console.log('inicio');
    } catch (error) {
        console.log(error.message);
    }
}

server();