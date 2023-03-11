import DMC_Ctrl from "./DMC_Ctrl.js";
import Promotion from "../Models/promotion.js";
import connection from "../Database/db.js";

async function querySubTable(table, dmcCtrl, col, where) {
  return new Promise((resolve, reject) => {
    dmcCtrl
      .select(table, col, where)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

class Promotion_Ctrl {
  constructor() {}

  async getPromotions(code) {
    return new Promise((resolve, reject) => {
      let dmcCtrl = new DMC_Ctrl(connection);

      // query promotion
      dmcCtrl.select("promotion", "code", code).then(async (result) => {
        let promotions = [];

        // sort promotion
        for (const promo of result) {
          // query price_per_typeP
          let price_per_typeP = await querySubTable(
            "price_per_typeP",
            dmcCtrl,
            "code",
            promo.code
          );

          // query days
          let days = await querySubTable(
            "promotion_by_day",
            dmcCtrl,
            "code",
            promo.code
          );

          // query service
          let pre_can_reduce = await querySubTable(
            "can_reduce",
            dmcCtrl,
            "code",
            promo.code
          );

          let can_reduce = await querySubTable(
            "service",
            dmcCtrl,
            "service_id",
            pre_can_reduce.map((s) => `${s.service_id}`)
          );

          let promotion = new Promotion(
            promo.code,
            promo.name,
            promo.descriptions,
            promo.starttime,
            promo.endtime,
            promo.limit_amount,
            promo.limit_type,
            price_per_typeP,
            days,
            can_reduce
          );
          promotions.push(promotion);
        }
        resolve(JSON.stringify({ promotions: promotions }));
      });
    });
  }

  async checkDuplicate(code) {
    return new Promise((resolve, reject) => {
      let dmcCtrl = new DMC_Ctrl(connection);
      dmcCtrl
        .select("promotion", "code", code)
        .then((result) => {
          if (result.length > 0) {
            resolve(JSON.stringify({ isDuplicate: true }));
          } else {
            resolve(JSON.stringify({ isDuplicate: false }));
          }
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
    });
  }

  async insertPromotion(
    code,
    name,
    descriptions,
    startTime,
    endTime,
    limit_amount,
    limit_type,
    price_per_typeP,
    days,
    can_reduce
  ) {
    return new Promise((resolve, reject) => {
      //! insert Promotion
      let dmcCtrl = new DMC_Ctrl(connection);
      let col = [
        "code",
        "name",
        "descriptions",
        "starttime",
        "endtime",
        "limit_amount",
        "limit_type",
      ];
      let val = [
        code,
        name,
        descriptions,
        startTime,
        endTime,
        limit_amount,
        limit_type,
      ];
      dmcCtrl.insert("promotion", col, val).catch((err) => {
        reject(JSON.stringify({ error: err }));
      });

      //! insert price_per_typeP
      for (let i = 0; i < price_per_typeP.length; i++) {
        col = ["code", "type_of_car", "reduce_type", "reduce"];
        val = [
          code,
          price_per_typeP[i].type_of_car,
          price_per_typeP[i].reduce_type,
          price_per_typeP[i].reduce,
        ];
        dmcCtrl.insert("price_per_typeP", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }

      //! insert days
      for (let i = 0; i < days.length; i++) {
        col = ["code", "day"];
        val = [code, days[i].day];
        dmcCtrl.insert("promotion_by_day", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }

      //! insert can_reduce
      for (let i = 0; i < can_reduce.length; i++) {
        col = ["code", "service_id"];
        val = [code, can_reduce[i].service_id];
        dmcCtrl.insert("can_reduce", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }
      resolve(JSON.stringify({ status: "success" }));
    });
  }

  async updatePromotion(
    code,
    name,
    descriptions,
    startTime,
    endTime,
    limit_amount,
    limit_type,
    price_per_typeP,
    days,
    can_reduce
  ) {
    return new Promise((resolve, reject) => {
      //! update Promotion
      let dmcCtrl = new DMC_Ctrl(connection);
      let set = [
        ["code", code],
        ["name", name],
        ["descriptions", descriptions],
        ["startTime", startTime],
        ["endTime", endTime],
        ["limit_amount", limit_amount],
        ["limit_type", limit_type],
      ];
      let where = ["code", code];
      dmcCtrl.update("promotion", set, where).catch((err) => {
        reject(JSON.stringify({ error: err }));
      });

      //! update price_per_typeP
      where = ["code", code];
      dmcCtrl.delete("price_per_typeP", where).catch((err) => {
        reject(JSON.stringify({ error: err }));
      });

      for (let i = 0; i < price_per_typeP.length; i++) {
        let col = ["code", "type_of_car", "reduce_type", "reduce"];
        let val = [
          code,
          price_per_typeP[i].type_of_car,
          price_per_typeP[i].reduce_type,
          price_per_typeP[i].reduce,
        ];
        dmcCtrl.insert("price_per_typeP", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }

      //! update days
      where = ["code", code];
      dmcCtrl.delete("days", where).catch((err) => {
        reject(JSON.stringify({ error: err }));
      });

      for (let i = 0; i < days.length; i++) {
        let col = ["code", "day"];
        let val = [code, days[i].day];
        dmcCtrl.insert("promotion_by_day", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }

      //! update can_reduce
      where = ["code", code];
      dmcCtrl.delete("can_reduce", where).catch((err) => {
        reject(JSON.stringify({ error: err }));
      });

      for (let i = 0; i < can_reduce.length; i++) {
        let col = ["code", "service_id"];
        let val = [code, can_reduce[i].service_id];
        dmcCtrl.insert("can_reduce", col, val).catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
      }
      resolve(JSON.stringify({ status: "success" }));
    });
  }

  async deletePromotion(code) {
    return new Promise((resolve, reject) => {
      let dmcCtrl = new DMC_Ctrl(connection);
      let where = ["code", code];
      dmcCtrl
        .delete("promotions", where)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }));
        });
    });
  }
}

export default Promotion_Ctrl;

// {
//   "code":"BIRTHDAY",
//   "name":"DISCOUNT 20%",
//   "desciption":"DISCOUNT ALL",
//   "image":"123",
//   "starttime":"01/01/22",
//   "endtime":"31/01/22",
//   "limitflag":0,
//   "limit_amount":"20",
//   "limit_type":"day",
//   "dayflag":0,
//   "price_per_typeP":[
//       {
//           "type_of_car":"TRUCK",
//           "reduce_type":"BATH",
//           "reduce":"150"
//       }
//   ],
//   "days":[
//       {
//       "day":"NEW_YEAR_DAY"
//       }
//   ],
//   "can_reduce":[
//       {
//           "service_id":"s123"
//       }
//   ]
// }
