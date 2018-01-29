const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.listen(3000);

