const buyCoin = async (selectedCoin, session, type) => {
  const purchasePointCoin = selectedCoin.coinName;
  const purchasePointCoinAmount = selectedCoin.coinAmount;
  const purchasePointAmountUSD = selectedCoin.coinAmountUSD;
  const transactionType = type;
  const data = await fetch(
    `http://localhost:3000/api/purchasePoint?user_email=${session?.user?.email}&coin_name=${purchasePointCoin}&coin_amount=${purchasePointCoinAmount}&usd_coin_amount=${purchasePointAmountUSD}&transaction_type=${transactionType}`
  );

  const response = await data;

  return response;
};

export default buyCoin;
