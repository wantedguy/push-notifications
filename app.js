const {Client } = require('pg')

const express = require('express');




const app = express();
const port = 3000;

app.use('/public',express.static('public'));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

var message = '';




const connectionString = 'postgressql://postgres:yourpassword@localhost:5432/db_name'
const client = new Client({
    connectionString:connectionString
});
client.connect()
client.query('SELECT * from messages', (err, res) =>{
    message = res.rows[0];
    client.end();
});

app.get('/', (req,res) =>{
    res.render('index',{message:message});
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});




