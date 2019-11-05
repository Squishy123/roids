const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

//static files
app.use('/static', express.static(path.join(__dirname, '../../assets')))

app.listen(port, () => { console.log(`Engine Server running on port ${port}`) });