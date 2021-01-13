const { CronJob } = require('cron');
const InsertOrdersService = require('../services/bling/InsertOrdersService');
const GetWonDealsService = require('../services/pipedrive/GetWonDealsService');
const UpdatedBlingPostedDealService = require('../services/pipedrive/UpdatedBlingPostedDealService');

const getWonDeals = new GetWonDealsService();
const insertOrders = new InsertOrdersService();
const updateBlingPosted = new UpdatedBlingPostedDealService();

const InsertNewOrdersJob = new CronJob('*/30 * * * * *', async () => {
  try {
    const deals = await getWonDeals.execute();

    const placedOrders = await insertOrders.execute(deals);

    await updateBlingPosted.execute(placedOrders);
  } catch (err) {
    console.log(err);
  }
});

module.exports = InsertNewOrdersJob;
