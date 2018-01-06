// import modules =============================================================

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const session    = require('express-session');
const settings   = require('./app_settings.json');
const routes     = require('./routes/_routes');

const mongoose   = require('./mongoose_connect');
const CourseModel = require('./models/CourseModel');
const PaymentModel = require('./models/PaymentModel');
const PoolModel = require('./models/PoolModel');
const UserModel = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');


// express set up =============================================================

const port = settings.port || 3000;
const ip = settings.ip || "localhost";
const appName = settings.app_name || "homework-bet-dev";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(session({
    secret: settings.session_secret,
    saveUninitialized: false,
    resave: true,
}));
app.use(routes);

app.listen(port, ip, function() {
    console.log(`${appName} started at ${ip}:${port}`);
})
