var express = require('express');
var app = express();

app.use(express.static('view'));
app.use(express.static('lib'));
app.use(express.static('js'));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
