// mongoose set up ============================================================
const app = require('express')();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const settings = require('./app_settings.json');

let db_name;
if (app.get('env') === 'production') {
    db_name = settings.db_name_prod;
} else if (app.get('env') === 'development') {
    db_name = settings.db_name_dev;
} else if (app.get('env') === 'test') {
    db_name = settings.db_name_test;
}

const db_url = settings.db_host + db_name;

mongoose.connect(db_url, function (err) {
    if (err) {
        console.log(`mongoose error: ${err}`);
    } else {
        console.log(`mongoose connected at ${db_url}`);
    }
})

module.exports = mongoose;