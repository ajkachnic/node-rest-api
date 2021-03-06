let express = require("express");
let bodyParser = require("body-parser");
let mainRouter = require("./routes/routes.js");
const helmet = require('helmet');
let app = express();

//app.use(bodyParser.json());
app.use(helmet())
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))

app.use('/', mainRouter)

let server = app.listen(3031, () => {
  console.log(`Running On Port ${server.address().port}`)
})