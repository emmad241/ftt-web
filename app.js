var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var Promise = require("promise");
const User = require('./config');

var indexRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var regRouter = require("./routes/registration");

var app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/reg", regRouter);

function googleLogin(){
    const providor = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(providor)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`)
            console.log(user)
        })
        .catch(console.log)
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("../views/pages/error");
});

app.listen(3000, () => {
	console.log(`Example app listening at http://localhost:3000`);
});

module.exports = app;