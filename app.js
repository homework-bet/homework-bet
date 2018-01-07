// check if settings are in place =============================================

const fs = require('fs');
console.log("Verifying app_settings.json.");
if (!fs.existsSync('./app_settings.json')) {
    console.log("app_settings.json doesn't exist.");
    process.exit(1);
}

const template = require('./template.app_settings.json')
const settings = require('./app_settings.json');

for(const key in template) {
    if (!(key in settings)) {
        console.log("app_settings.json is invalid!")
        console.log("property not found in settings: " + key);
        process.exit(1);
    }
}

console.log("App settings are valid.");

// import modules =============================================================

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const session     = require('express-session');
const routes      = require('./routes/_routes');

const mongoose          = require('./mongoose_connect');
const CourseModel       = require('./models/CourseModel');
const PaymentModel      = require('./models/PaymentModel');
const PoolModel         = require('./models/PoolModel');
const UserModel         = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');

// express set up =============================================================

const port = settings.port || 3000;
const ip = settings.ip || "localhost";
const appName = settings.app_name || "homework-bet-dev";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: settings.session_secret,
    saveUninitialized: false,
    resave: true,
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    res.locals.session = req.session
    if (req.session.user) {
        // TODO: handle case where coming from a logout page
        req.flash("info", "Current User: " + req.session.user.email);
    }
    next();
});

app.use(routes);

app.listen(port, ip, function() {
    console.log(`${appName} started at ${ip}:${port}`);
})
