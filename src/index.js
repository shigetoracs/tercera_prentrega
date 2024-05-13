import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import GithubStrategy from "passport-github2";
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexrouter.js";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport/passport.js";
import { config } from "dotenv";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import varenv from "./dotenv.js";

const app = express();
const PORT = 8080;
//Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// const io = new Server(server);

//Middlewares//
mongoose
  .connect(varenv.mongo_url)
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log(e));

app.use(express.json());

app.use(
  session({
    secret: varenv.session_secret,
    resave: true,
    store: MongoStore.create({
      mongoUrl: varenv.mongo_url,
      ttl: 60 * 60,
      autoRemove: "interval",
    }),
    saveUninitialized: true,
  })
);
app.use(cookieParser(varenv.cookies_secret));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

//ROUTES COOKIES
app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "Esto es una cookie", {
      maxAge: 30000000000,
      signed: true,
    })
    .send("Cookie Creada");
});
app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("CookieCookie").send("Cookie Eliminada");
});
//ROUTES SESSIONS

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Sos el user num ${req.session.counter} en ingresar a la pagina`);
  } else {
    req.session.counter = 1;
    res.send("sos el primer user en ingresar a la page");
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email == "admin@admin.com" && password == "1234") {
    req.session.email = email;
    req.session.password = password;
  }
  console.log(req.session);
  res.send("Login");
});

