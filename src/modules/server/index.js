const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const apiV1 = require('./apiV1/routes');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use('/v1', apiV1);
app.use(morgan('tiny'));

const httpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, 'config', 'https', 'localhost.key'),
  ),
  cert: fs.readFileSync(
    path.join(__dirname, 'config', 'https', 'localhost.crt'),
  ),
};
const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app);

module.exports = {
  httpsServer,
  httpServer,
};
