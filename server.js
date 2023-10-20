const express = require('express');
const cors = require('cors');  
const app = express();
const port = 8000;

require('./config/mongoose.config.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.listen(port, () => console.log("Server is listening at port ", port));