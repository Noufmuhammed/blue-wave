require("dotenv").config() // loads variables from .env

const connectDB = require("./db") // connects to MongoDB

const lessonsRouter = require("./routes/lessons") 
const bookingsRouter = require("./routes/bookings")
const authRouter = require("./routes/auth") 
const helpRouter = require("./routes/help")
const contactRouter = require("./routes/contact")
connectDB() // connects to MongoDB

const express = require("express") // imports Express
const session = require("express-session") // allows sessions

const app = express() // creates our Express app


// Middleware
app.use(express.static("public")) // serves CSS and other public files
app.use(express.urlencoded({ extended: true })) // reads form data


// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


// Makes the logged-in user available to all EJS pages
app.use((req, res, next) => {

  res.locals.user = req.session.user

  next()
})


// Routes
app.use("/lessons", lessonsRouter)
app.use("/bookings", bookingsRouter)
app.use("/auth", authRouter)
app.use("/help", helpRouter)
app.use("/contact", contactRouter)
// EJS
app.set("view engine", "ejs")


// Homepage
app.get("/", (req, res) => {

  res.render("homepage")

})


// Start server
app.listen(process.env.PORT, () => {

  console.log(`Server running on port ${process.env.PORT}`)

})