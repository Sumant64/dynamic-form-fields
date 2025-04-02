const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDb = require('../config/db');
const configRouter = require('./routes/configRoutes');
const personalInfoRouter = require('./routes/personalInfoRoutes');

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/config', configRouter);
app.use('/api/personal-info', personalInfoRouter);

app.listen(port, () => {
    console.log(`app is running in the port ${port}`);
})