const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  package: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Lesson", lessonSchema)