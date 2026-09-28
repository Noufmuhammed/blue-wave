const express = require("express")

const router = express.Router()


// Contact page
router.get("/", (req, res) => {

    res.render("contact")

})


module.exports = router