const { Connectdb } = require("./src/Services/Connect");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session=require('express-session')


const cookieSession=require('cookie-session')
const passport=require('passport')
const app = express();

const passportStrategy = require("./passport");


app.use(
  (session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))
)
app.use(passport.initialize())
app.use(passport.session())



const port = process.env.PORT || 7778;

app.listen(port, console.log(`listening on port http://localhost:${port}`));
app.use( cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  }));
app.use(express.json());
app.use(express.static("public"));
Connectdb().catch((err) => console.log(err));

const errorRoute = require("./src/routes/404");
const UsersRoute = require("./src/routes/Users");


const ClientsRoutes=require('./src/routes/Clients')
const TrajetRoutes=require('./src/routes/Trajet')
const EnginRoutes=require('./src/routes/Engin')
const reserveRoutes=require('./src/routes/Reservation')
const statsRoutes=require('./src/routes/Stats')
const PayRoute=require('./src/routes/Paiement')

const userRoutes=require('./src/routes/Users')
const authRoute=require('./src/routes/auth')


app.use(authRoute)

app.use(userRoutes)
app.use(PayRoute)
app.use(statsRoutes)
app.use(reserveRoutes)
app.use(EnginRoutes)
app.use(TrajetRoutes)
app.use(ClientsRoutes)
app.use(UsersRoute);
app.use(errorRoute);
