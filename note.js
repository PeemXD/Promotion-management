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

/*
  dmcCtrl.select("promotion").then((result) => {
    result.forEach(async (promo) =>
  เราจะใช้ await ใน loop เราเลยใส่ async
  อันนี้โดน skip loop เพราะ ใส่ asyc เมื่อลูปเริ่มแล้ว เราบอกมันเป็น async มันเลยข้าม

  แก้โดยใช้ 
  for (const promo of result)
  เราจะใช้ await แต่ใช้ไม่ได้ เพราะไม่มีที่ให้ใส่ async ที่ for of
  เราเลยต้องไปใส่ข้างบน
  จะได้ตามนี้
  --------------------------------ใส่ตรงนี้
  dmcCtrl.select("promotion").then(async (result) => {
    for (const promo of result) 

*/

////////////////////////////////////////////////////////////////////////
//!   query parameter technique
//*   api enpoint --> /promotions;
//!   can use
//*   http://localhost:3000/promotions?code=BIRTHDAY
//!   sent parameter with params but not show parameter
//*   http://localhost:3000/promotions
//? and
//!   URL path parameter technique
//*   api enpoint --> /promotions/:code
//!   can use
//*   http://localhost:3000/promotions/code=BIRTHDAY
//!   sent parameter with params and show parameter in path
//*   http://localhost:3000/promotions/code
