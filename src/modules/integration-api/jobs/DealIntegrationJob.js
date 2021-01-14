const { CronJob } = require('cron');
const PlaceOrdersOnBlingService = require('../services/bling/PlaceOrdersOnBlingService');
const GetWonDealsService = require('../services/pipedrive/GetWonDealsService');
const UpdatedBlingPostedDealService = require('../services/pipedrive/UpdatedBlingPostedDealService');
const ConsolidateDealsService = require('../services/deals/ConsolidateDealsService');

const getWonDeals = new GetWonDealsService();
const placeOrdersOnBling = new PlaceOrdersOnBlingService();
const updateBlingPosted = new UpdatedBlingPostedDealService();
const consolidateDeals = new ConsolidateDealsService();

const DealIntegrationJob = new CronJob('*/30 * * * * *', async () => {
  try {
    const newDealsWon = await getWonDeals.execute();

    if (!newDealsWon) return;

    const blingPlacedOrders = await placeOrdersOnBling.execute(newDealsWon);

    await updateBlingPosted.execute(blingPlacedOrders);

    await consolidateDeals.execute(blingPlacedOrders);
  } catch (err) {
    console.log(err);
  }
});

module.exports = DealIntegrationJob;
