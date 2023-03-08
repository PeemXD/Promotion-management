import DMC_Ctrl from "./DMC_Ctrl.js";
import Promotion from "../Models/promotion.js";
import connection from "../Database/db.js";

async function querySubTable(table, dmcCtrl, code) {
  return new Promise((resolve, reject) => {
    dmcCtrl
      .select(table, "code", code)
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

  async getAllPromotions() {
    return new Promise((resolve, reject) => {
      let dmcCtrl = new DMC_Ctrl(connection);

      // query promotion
      dmcCtrl.select("promotion").then(async (result) => {
        let promotions = [];

        // sort promotion
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
          let can_reduce = await querySubTable(
            "can_reduce",
            dmcCtrl,
            promo.code
          );

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
        resolve(JSON.stringify({ promotions: promotions }));
      });
    });
  }

  async checkDuplicate(code) {
    return new Promise((resolve, reject) => {
      let dmcCtrl = new DMC_Ctrl(connection);
      dmcCtrl
        .select("promotions", "code", code)
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
    description,
    startTime,
    endTime,
    limit_amount,
    limitType,
    price_per_typeP,
    promotion_by_day,
    can_reduce
  ) {
    return new Promise((resolve, reject) => {
      //! insert Promotion
      let dmcCtrl = new DMC_Ctrl(connection);
      let col = [
        "code",
        "name",
        "description",
        "startTime",
        "endTime",
        "limit_amount",
        "limitType",
      ];
      let val = [
        code,
        name,
        description,
        startTime,
        endTime,
        limit_amount,
        limitType,
      ];
      dmcCtrl
        .insert("promotion", col, val)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
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
        dmcCtrl
          .insert("price_per_typeP", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }

      //! insert promotion_by_day
      for (let i = 0; i < promotion_by_day.length; i++) {
        col = ["code", "day"];
        val = [code, promotion_by_day[i].day];
        dmcCtrl
          .insert("promotion_by_day", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }

      //! insert can_reduce
      for (let i = 0; i < can_reduce.length; i++) {
        col = ["code", "service_id"];
        val = [code, can_reduce[i].service_id];
        dmcCtrl
          .insert("can_reduce", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }
    });
  }

  async updatePromotion(
    code,
    name,
    description,
    startTime,
    endTime,
    limit_amount,
    limitType,
    price_per_typeP,
    promotion_by_day,
    can_reduce
  ) {
    return new Promise((resolve, reject) => {
      //! update Promotion
      let dmcCtrl = new DMC_Ctrl(connection);
      let set = [
        ["code", code],
        ["name", name],
        ["description", description],
        ["startTime", startTime],
        ["endTime", endTime],
        ["limit_amount", limit_amount],
        ["limitType", limitType],
      ];
      let where = ["code", code];
      dmcCtrl
        .update("promotion", set, where)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }));
        });

      //! update price_per_typeP
      where = ["code", code];
      dmcCtrl
        .delete("price_per_typeP", where)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
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
        dmcCtrl
          .insert("price_per_typeP", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }

      //! update promotion_by_day
      where = ["code", code];
      dmcCtrl
        .delete("promotion_by_day", where)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }));
        });

      for (let i = 0; i < promotion_by_day.length; i++) {
        let col = ["code", "day"];
        let val = [code, promotion_by_day[i].day];
        dmcCtrl
          .insert("promotion_by_day", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }

      //! update can_reduce
      where = ["code", code];
      dmcCtrl
        .delete("can_reduce", where)
        .then((result) => {
          resolve(JSON.stringify({ result: result }));
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }));
        });

      for (let i = 0; i < can_reduce.length; i++) {
        let col = ["code", "service_id"];
        let val = [code, can_reduce[i].service_id];
        dmcCtrl
          .insert("can_reduce", col, val)
          .then((result) => {
            resolve(JSON.stringify({ result: result }));
          })
          .catch((err) => {
            reject(JSON.stringify({ error: err }));
          });
      }
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
//   "promotion_by_day":[
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
