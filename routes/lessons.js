const express = require("express")
const Lesson = require("../models/Lesson")
const router = express.Router()

router.get("/", async (req, res) => {
  const lessons = await Lesson.find()

  res.render("all-lessons", {
    lessons: lessons
  })
})



module.exports = router