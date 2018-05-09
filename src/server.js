const express = require('express');
const app = express();



app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.get("/entries", (req, res) => {
    res.sendFile('../public/entries.html' , {root : __dirname});
})