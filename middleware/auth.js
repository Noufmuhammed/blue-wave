const isLoggedIn = (req, res, next) => {

  // Check if the user is logged in
  if (!req.session.user) {

    req.session.originalUrl = req.originalUrl


    // Send them to the correct sign-in page
    return res.redirect("/auth/sign-in")

  }

  // Continue if the user is logged in
  next()
}

module.exports = isLoggedIn