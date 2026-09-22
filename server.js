require("dotenv").config()

const connectDB = require("./db")
const lessonsRouter = require("./routes/lessons")
connectDB()

const express = require("express")
const app = express()

app.use(express.static("public"))
app.use("/lessons", lessonsRouter)
app.set("view engine", "ejs")

//routes

app.get("/", (req, res) => {
  res.render("homepage")
})




app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})