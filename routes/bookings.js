const express = require("express") 

const Booking = require("../models/Booking") 

const Lesson = require("../models/Lesson")

const isLoggedIn = require("../middleware/auth") 

const router = express.Router() 




router.get("/", isLoggedIn, async (req, res) => {

  const bookings = await Booking.find({

    user: req.session.user._id

  }).populate("lesson")

  res.render("bookings", {

    bookings: bookings

  })

})



router.post("/", isLoggedIn, async (req, res) => {
  await Booking.create({
    user: req.session.user._id,
    lesson: req.body.lessonId,
    waterAwareness: req.body.waterAwareness === "true"
  })

  req.session.toast = "Booking confirmed!"

  res.redirect("/bookings")
})




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



router.post("/:id", isLoggedIn, async (req, res) => {
  await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.session.user._id
    },
    {
      lesson: req.body.lessonId,
      waterAwareness: req.body.waterAwareness === "true"
    }
  )

  req.session.toast = "Booking updated successfully!"

  res.redirect("/bookings")
})




router.post("/:id/delete", isLoggedIn, async (req, res) => {

  await Booking.findOneAndDelete({

    _id: req.params.id,

    user: req.session.user._id

  })

  res.redirect("/bookings")

})


module.exports = router