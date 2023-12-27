const { Connectdb } = require("./src/Services/Connect");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7778;

app.listen(port, console.log(`listening on port http://localhost:${port}`));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

Connectdb().catch((err) => console.log(err));

const UsersRoute = require("./src/routes/Users");


app.use(UsersRoute);

