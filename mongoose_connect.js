// mongoose set up ============================================================
const app = require('express')();
const mongoose = require('mongoose');
const settings = require('./app_settings.json');

let db_name;
if (app.get('env') === 'production') {
    db_name = settings.db_name_prod || "homework-bet-prod";
} else {
    db_name = settings.db_name_dev || "homework-bet-dev";
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