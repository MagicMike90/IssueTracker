const express = require('express');

const app = express();
app.use(express.static('static'));

const port_number = 30001;
app.listen(port_number, function () {
    console.log('App started on port ' + port_number);
});
