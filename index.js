const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require("path")
const cookieSession = require("cookie-session");
require('dotenv/config');

const port = 3000

//MIDDLEWARES
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client','build')))



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))