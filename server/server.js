const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const IntializePassport = require("./config/passport");
const PORT = 5000 || process.env.PORT;
const secret = process.env.SESSION_SECRET;

// Connect to Database
connectDB();
// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "*", // Replace with your client's origin
  })
);

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());

// Intialize passport
IntializePassport(passport);
//Define Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/manager", require("./routes/manager"));

server.listen(PORT, () => console.log(`Servunning on por ${PORT}`));
