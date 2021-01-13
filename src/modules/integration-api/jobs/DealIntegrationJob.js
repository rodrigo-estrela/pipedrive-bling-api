const { CronJob } = require('cron');
const InsertOrderService = require('../services/bling/InsertOrderService');
const GetWonDealsService = require('../services/pipedrive/GetWonDealsService');

const getWonDeals = new GetWonDealsService();
const insertOrder = new InsertOrderService();

const InsertNewOrdersJob = new CronJob('*/30 * * * * *', async () => {
  console.log('getting new deals with won status at pipedrive');
  await getWonDeals.execute();

  console.log('sending new orders to bling');
  await insertOrder.execute();
});

module.exports = InsertNewOrdersJob;
