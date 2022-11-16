require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes");
const bodyparser = require("body-parser");
const cors = require("cors")
const axios = require("axios")



app.use(cors);
app.use(bodyparser.json());
app.use(routes);

app.listen(PORT,()=>{
    console.log(`Connecting to PORT ${PORT}`)
})