import Promotion_Ctrl from "../Controllers/Promotion_Ctrl.js";

class Rotes {
  static handleGetAllPromotions = async (req, res) => {
    try {
      let promotionCtrl = new Promotion_Ctrl();
      let result = await promotionCtrl.getAllPromotions();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static handleCheckDuplicate = async (req, res) => {
    try {
      let promotionCtrl = new Promotion_Ctrl();
      let result = await promotionCtrl.checkDuplicate(req.params.code);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static handleInsertPromotion = async (req, res) => {
    try {
      let promotionCtrl = new Promotion_Ctrl();
      let result = await promotionCtrl.insertPromotion(
        req.body.code,
        req.body.name,
        req.body.description,
        req.body.startTime,
        req.body.endTime,
        req.body.limit_amount,
        req.body.limit_type,
        req.body.price_per_typeP,
        req.body.promotion_by_day,
        req.body.can_reduce
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static handleUpdatePromotion = async (req, res) => {
    try {
      let promotionCtrl = new Promotion_Ctrl();
      let result = await promotionCtrl.updatePromotion(
        req.body.code,
        req.body.name,
        req.body.description,
        req.body.startTime,
        req.body.endTime,
        req.body.limit_amount,
        req.body.limit_type,
        req.body.price_per_typeP,
        req.body.promotion_by_day,
        req.body.can_reduce
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static handleDeletePromotion = async (req, res) => {
    try {
      let promotionCtrl = new Promotion_Ctrl();
      let result = await promotionCtrl.deletePromotion(req.params.code);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

export default Rotes;
