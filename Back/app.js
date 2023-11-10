require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 7778;
app.listen(port, console.log(`listening on port ${port}`));
app.use(cors);
var db = require("./src/Services/Connect");

const UsersRoute = require("./src/routes/Users");

app.use(UsersRoute);
