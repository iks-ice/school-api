require('dotenv').config();

const express = require('express');

const app = express();
require('./db/connectDB')();

app.use(express.json({ extended: true }));
app.get('/', (req, res) => res.json({ msg: 'Home route' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
