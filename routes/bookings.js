const express = require("express") // imports Express
const Booking = require("../models/Booking") // imports Booking model
const Lesson = require("../models/Lesson") // imports Lesson model
const isLoggedIn = require("../middleware/auth") // checks if user is logged in

const router = express.Router() // creates the router


// VIEW MY BOOKINGS
router.get("/", isLoggedIn, async (req, res) => {

  const bookings = await Booking.find({
    user: req.session.user._id
  }).populate("lesson")

  res.render("bookings", {
    bookings: bookings
  })
})


// CREATE A BOOKING
router.post("/", isLoggedIn, async (req, res) => {

  await Booking.create({
    user: req.session.user._id,
    lesson: req.body.lessonId
  })

  res.redirect("/bookings")
})


// SHOW EDIT BOOKING PAGE
router.get("/:id/edit", isLoggedIn, async (req, res) => {

  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.session.user._id
  }).populate("lesson")

  const lessons = await Lesson.find()

  res.render("edit-booking", {
    booking: booking,
    lessons: lessons
  })
})


// UPDATE A BOOKING
router.post("/:id", isLoggedIn, async (req, res) => {

  await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.session.user._id
    },
    {
      lesson: req.body.lessonId
    }
  )

  res.redirect("/bookings")
})


// CANCEL A BOOKING
router.post("/:id/delete", isLoggedIn, async (req, res) => {

  await Booking.findOneAndDelete({
    _id: req.params.id,
    user: req.session.user._id
  })

  res.redirect("/bookings")
})


module.exports = router