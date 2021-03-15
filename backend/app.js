let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser');

const userAPI = require('./routes/user.route')
const app = express();

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Database connected")
    },
    error => {
        console.log("Database could't be connected to: " + error)
    }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// API
app.use('/', userAPI)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(server.address().address)
    console.log(`Express server listening on port ${port}`)
})

// Find 404
app.use((req, res, next) => {
    // next(createError(404));
    res.status(404);
    res.type('txt').send('Not found');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});