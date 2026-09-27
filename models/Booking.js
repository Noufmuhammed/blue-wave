const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true
  },

  waterAwareness: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Booking", bookingSchema)