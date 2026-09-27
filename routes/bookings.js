const express = require("express") // imports Express
const Booking = require("../models/Booking") // imports Booking model
const Lesson = require("../models/Lesson") // imports Lesson model
const isLoggedIn = require("../middleware/auth") // protects booking routes

const router = express.Router() // creates the router


// VIEW MY BOOKINGS
router.get("/", isLoggedIn, async (req, res) => {

  // Find only bookings belonging to the logged-in user
  const bookings = await Booking.find({
    user: req.session.user._id
  }).populate("lesson")

  // Show the bookings page
  res.render("bookings", {
    bookings: bookings
  })
})


// CREATE A BOOKING
router.post("/", isLoggedIn, async (req, res) => {

  // Create a new booking using the logged-in user's ID
  // and the lesson they selected
  await Booking.create({
    user: req.session.user._id,
    lesson: req.body.lessonId
  })

  // Go to My Bookings
  res.redirect("/bookings")
})


// SHOW EDIT BOOKING PAGE
router.get("/:id/edit", isLoggedIn, async (req, res) => {

  // Find the booking and make sure it belongs to the logged-in user
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.session.user._id
  }).populate("lesson")

  // Get all available lessons
  const lessons = await Lesson.find()

  // Show the edit page
  res.render("edit-booking", {
    booking: booking,
    lessons: lessons
  })
})


// UPDATE A BOOKING
router.post("/:id", isLoggedIn, async (req, res) => {

  // Update the booking only if it belongs to the logged-in user
  await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.session.user._id
    },
    {
      lesson: req.body.lessonId
    }
  )

  // Go back to My Bookings
  res.redirect("/bookings")
})


// DELETE / CANCEL A BOOKING
router.post("/:id/delete", isLoggedIn, async (req, res) => {

  // Delete the booking only if it belongs to the logged-in user
  await Booking.findOneAndDelete({
    _id: req.params.id,
    user: req.session.user._id
  })

  // Go back to My Bookings
  res.redirect("/bookings")
})


module.exports = router