const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

const server = app.listen(3000);

