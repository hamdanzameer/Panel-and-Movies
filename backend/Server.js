const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./Users");
const orders = require("../backend/models/ordersinfo");
const checkcat = require("../backend/models/newcategories");
const mongoose = require("mongoose");
const moviesRouter = require("./MoviesServer")
const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

const secretKey = process.env.secretKey;

// DATA BSE CONFIGURATION START
mongoose.connect("mongodb://localhost:27017/PANELDATA");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error ;"));
db.once("open", () => {
  console.log("Connected to database MongoDB");
});
// DATA BSE CONFIGURATION END

app.use("",moviesRouter)


// SUBMIT ORDER API START
app.post("/submit-order", async (req, resp) => {
  try {
    const { service, category, link, amount, charges, time } = req.body;
    // console.log("Backend, order is ", req.body);
    const newOrder = new orders({
      service,
      category,
      link,
      amount,
      charges,
      time,
    });
    await newOrder.save();
    resp
      .status(201)
      .json({ message: "Order Submitted Successfully", newOrder });
  } catch (error) {
    console.error("Error Submitting Order :", error);
    console.log(error);
    resp
      .status(500)
      .json({ error: "From Backend Error while Submitting the Order" });
  }
});
// SUBMIT ORDER API END

// SIGNUP API START
app.post("/signup", async (req, resp) => {
  try {
    const { email, name, username, password } = req.body;
    // console.log(req.body);

    const newUser = new User({
      email,
      name,
      username,
      password,
    });
    const result = await newUser.save();
    // console.log(result);
    resp.status(201).json({ message: "User Created" });
  } catch (error) {
    resp.status(500).json({ error: "Error creating User" });
  }
});
// SIGNUP API END

// lOGIN API START
app.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;
    // console.log("hello", req.body);

    const user = await User.findOne({ $or: [{ username: email }, { email }] });
    if (!user) {
      return resp.status(404).json({ error: "User not Found" });
    }
    if (user.password !== password) {
      return resp.status(401).json({ error: "Password Incorrect" });
    }
    // resp.status(200).json({ user });

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );
    resp.status(200).json({ user,token });
  } catch (error) {
    resp.status(500).json({ error: "Error Logging In" });
  }
});

const verifyToken = (req, resp,next ) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return resp.status(401).json({ message: "Token not Provided" });
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return resp.status(403).json({ error: "Failed to Authenticate Token" });
    }
    req.user = decoded;
    next();
  });
};
app.get("/protected", verifyToken, (req, resp) => {
  resp
    .status(200)
    .json({ message: "This is a protected Route", user: req.user });
});
// lOGIN API END

// CATEGORIES API START
app.get("/category", async (req, resp) => {
  try {
    const categories = await checkcat.find();
    // console.log("SARI CATEGORIES From New Categories", categories);
    resp.json(categories);
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "BACKEND, Error While Fetching Categories or Services",
    });
  }
});
// CATEGORIES API END

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${port}`)
);
