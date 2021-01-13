require('./shared/database');
const { httpsServer, httpServer } = require('./modules/server');
const Workers = require('./modules/integration-api/jobs');
const config = require('./config');

httpsServer.listen(config.httpsPort, () => {
  console.log(`✅ HTTPS server is running at port ${config.httpsPort}`);
});

httpServer.listen(3000, () => {
  console.log(`✅ HTTP server is running at port ${config.httpPort}`);
});

Workers.init();
