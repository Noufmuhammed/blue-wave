const express = require("express")

const router = express.Router()


// Help Center page
router.get("/", (req, res) => {

    res.render("help")

})

module.exports = router