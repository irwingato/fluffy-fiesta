const express = require('express');
const { PORT, mongoDBURL } = require('./config.js');
const mongoose = require('mongoose');
const tarefasRotas = require('./routes/tarefasRotas.js');
const cors = require('cors');
const usuarioRotas = require('./routes/usuarioRotas.js');
const autenticarRotas = require('./routes/autenticarRotas.js');

const app = express();

/* Middleware para parsing request bodies */
app.use(express.json());

/* Enables CORS */
app.use(cors());

/* Middleware for handling cors policy */
/* Option 1: Allow all origins with default of cors (*) */
//app.use(cors());
/* Option 2: Allow specific origins with cors */
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.use('/tarefas', tarefasRotas);
app.use('/autenticar', autenticarRotas);
app.use('/usuario', usuarioRotas);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});