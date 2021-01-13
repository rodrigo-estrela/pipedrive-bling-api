require('./database');
const { httpsServer, httpServer } = require('./server');
const config = require('./config');

httpsServer.listen(config.httpsPort, () => {
  console.log(`🔒 HTTPS server is running at port ${config.httpsPort}`);
});

httpServer.listen(3000, () => {
  console.log(`HTTP server is running at port ${config.httpPort}`);
});
const Workers = require('./jobs');

Workers.init();
