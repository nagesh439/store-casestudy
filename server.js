var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    path = require("path")
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    bodyparser = 
    server = http.createServer(app);
    bodyparser = require('body-parser');
    const config = require("./config.json");

mongoose.set("useFindAndModify", false);
//billingDB
var mongoURl = config.mongoURL

let dbPoolSize = 5;
// let socketTime = 30000;
let connectTime = 30000;

const m_options = {
    poolSize: dbPoolSize,
    connectTimeoutMS: connectTime,
    useUnifiedTopology : true,
    useNewUrlParser: true,
    // socketOptions : {
    //     socketTimeoutMS : socketTime
    // },
};
mongoose.connect(mongoURl, m_options, function (err) {
    if (err) {
        console.log("Mongo Error " + err);
    } else {
        console.log("MongoDB Connection Established");
    }
});
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set("port", 3009);
require('./routes/outletRoute')(app);
require('./routes/brandRoute')(app);
require('./routes/categoryRoute')(app);
require('./routes/itemRoute')(app);

server.listen(app.get('port'), function () {
    console.log("listerning")
})
