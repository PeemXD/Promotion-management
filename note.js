dmcCtrl.select("promotion").then((result) => {
  let promotions = [];

  // sort promotion
  result.forEach(async (promo) => {
    // query price_per_typeP
    let price_per_typeP = await querySubTable(
      "price_per_typeP",
      dmcCtrl,
      promo.code
    );

    // query promotion_by_day
    let promotion_by_day = await querySubTable(
      "promotion_by_day",
      dmcCtrl,
      promo.code
    );

    // query service
    let can_reduce = await querySubTable("can_reduce", dmcCtrl, promo.code);

    let promotion = new Promotion(
      promo.code,
      promo.name,
      promo.description,
      promo.startTime,
      promo.endTime,
      promo.limit_amount,
      promo.limitType,
      price_per_typeP,
      promotion_by_day,
      can_reduce
    );
    promotions.push(promotion);
  });
  console.log(promotions);
  resolve(JSON.stringify({ promotions: promotions }));
});

//! js skip this loop fix by add async above loop
//! and switch from forEach to for of like below

dmcCtrl.select("promotion").then(async (result) => {
  //! add async above
  let promotions = [];

  // sort promotion
  // result.forEach(async (promo) =>
  for (const promo of result) {
    // query price_per_typeP
    let price_per_typeP = await querySubTable(
      "price_per_typeP",
      dmcCtrl,
      promo.code
    );

    // query promotion_by_day
    let promotion_by_day = await querySubTable(
      "promotion_by_day",
      dmcCtrl,
      promo.code
    );

    // query service
    let can_reduce = await querySubTable("can_reduce", dmcCtrl, promo.code);

    let promotion = new Promotion(
      promo.code,
      promo.name,
      promo.description,
      promo.startTime,
      promo.endTime,
      promo.limit_amount,
      promo.limitType,
      price_per_typeP,
      promotion_by_day,
      can_reduce
    );
    promotions.push(promotion);
  }
  console.log(promotions);
  resolve(JSON.stringify({ promotions: promotions }));
});
