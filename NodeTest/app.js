const express = require('express');

const app = express();

app.use('/test', (req,res, next) =>{
    res.send('<div><h1>Welcome</h1><h3>Everything is NOT Fine</h3></div>')

});
app.use('/', (req,res, next) =>{
    res.send('<div><h1>Welcome</h1><h3>Everything is Fine</h3></div>')

});

app.listen(8080);
console.log(`listening on port 8080`)