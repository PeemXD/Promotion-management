import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Rotes from "./Routes/Promotion.routes.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 3000;

app.use(bodyParser.json());

app.get("/promotions", Rotes.handleGetPromotions);

app.get("/promotions/checkduplicate", Rotes.handleCheckDuplicate);

app.post("/promotions", Rotes.handleInsertPromotion);

app.put("/promotions", Rotes.handleUpdatePromotion);

app.delete("/promotions", Rotes.handleDeletePromotion);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
