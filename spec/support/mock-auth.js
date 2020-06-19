module.exports = {
  fakeIt(app) {
    let id, email, fName, lName;

    function middleware(req, res, next) {
      id = req.body.userId || id;
      email = req.body.email || email;
      fName = req.body.fName || fName;
      lName = req.body.lName || lName;

      if(id && id != 0) {
        req.user = {
          "id": id,
          "email": email,
          "fName": fName,
          "lName": lName
        };
      }else if(id === 0) {
        delete req.user;
      }

      if(next) {next()}
    }

    function route(req, res) {
      res.redirect("/")
    }

    app.use(middleware)
    app.get("/auth/fake", route)
  }
}
