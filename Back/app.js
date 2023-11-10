require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7778;
app.listen(port, console.log(`listening on port ${port}`));
app.use(cors);
app.use(express.json());
require("./src/Services/Connect");

const UsersRoute = require("./src/routes/Users");

app.use(UsersRoute);
