const path = require("path");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');

const passportJWT = require('./middlewares/passportJWT')();
const errorHandler = require('./middlewares/errorHandler');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const followRoutes = require('./routes/follow');
// const { config } = require('process');

const app = express();

app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest-api-node', { useNewUrlParser: true })

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/post', passportJWT.authenticate(), postRoutes);
app.use('/api/follow', passportJWT.authenticate(), followRoutes);

app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening")
})