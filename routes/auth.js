const express = require("express") // imports Express
const router = express.Router() // creates the router
const User = require("../models/User.js") // imports User model
const bcrypt = require("bcrypt") // handles password hashing

// Sign up page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs")
})

// Sign up
router.post("/sign-up", async (req, res) => {

  // Check if the username already exists
  const userInDatabase = await User.findOne({
    username: req.body.username
  })

  if (userInDatabase) {
    return res.send("Username already taken.")
  }

  // Check that both passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match.")
  }

  // Hash the password before saving it
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)

  // Create the user
  await User.create({
    username: req.body.username,
    password: hashedPassword
  })

  // Send the user to the sign-in page
  res.redirect("/auth/sign-in")
})

// Sign in page
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs")
})

// Sign in
router.post("/sign-in", async (req, res) => {

  // Find the user in the database
  const userInDatabase = await User.findOne({
    username: req.body.username
  })

  // Username doesn't exist
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.")
  }

  // Check the password
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )

  // Password is wrong
  if (!validPassword) {
    return res.send("Login failed. Please try again.")
  }

  // Save the logged-in user in the session
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  }

  // Go to homepage
  res.redirect("/")
})

// Sign out
router.get("/sign-out", (req, res) => {

  // Destroy the session
  req.session.destroy()

  // Go back to homepage
  res.redirect("/")
})

module.exports = router