const buyCoin = async (selectedCoin, session) => {
  const purchasePointCoin = selectedCoin.coinName;
  const purchasePointCoinAmount = selectedCoin.coinAmount;
  const purchasePointAmountUSD = selectedCoin.coinAmountUSD;
  const data = await fetch(
    `http://localhost:3000/api/purchasePoint?user_email=${session?.user?.email}&coin_name=${purchasePointCoin}&coin_amount=${purchasePointCoinAmount}&usd_coin_amount=${purchasePointAmountUSD}`
  );

  const response = await data;

  return response;
};

export default buyCoin;
