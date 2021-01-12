const GetWonDealsService = require('./pipedrive/GetWonDealsService');
const PostDealService = require('./bling/InsertOrderService');

async function main() {
  const getWonDeals = new GetWonDealsService();
  await getWonDeals.execute();

  const postDeal = new PostDealService();
  await postDeal.execute();
}

main();
