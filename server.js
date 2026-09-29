require("dotenv").config() // loads 

const connectDB = require("./db") 

const lessonsRouter = require("./routes/lessons") 
const bookingsRouter = require("./routes/bookings")
const authRouter = require("./routes/auth") 
const helpRouter = require("./routes/help")
const contactRouter = require("./routes/contact")
connectDB() 

const express = require("express") 
const session = require("express-session")  

const app = express() 



app.use(express.static("public"))  
app.use(express.urlencoded({ extended: true })) 



app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: false
}))



app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.toast = req.session.toast

  delete req.session.toast

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