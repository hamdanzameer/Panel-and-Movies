const express=require('express')
const app=express()
const User = require('./Users')
app.post("/login", async (req, resp) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email });
      if (!user) {
        return resp.status(404).json({ error: "User not Found" });
      }
      if (user.password !== password) {
        return resp.status(401).json({ error: "Password Incorrect" });
      }
      resp.status(200).json({ message: "Login Successful" });
    } catch (error) {
      resp.status(500).json({ error: "Error Logging In" });
    }
  });