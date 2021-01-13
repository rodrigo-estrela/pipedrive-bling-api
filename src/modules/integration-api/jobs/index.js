const dealIntegration = require('./DealIntegrationJob');

class Workers {
  static init() {
    dealIntegration.start();
  }
}

module.exports = Workers;
