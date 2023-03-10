import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Rotes from "./Routes/Promotion.routes.js";
import {
  validateCode,
  validatePromotion,
} from "./validate/validatePromotion.js";

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully.");
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server closed.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
});

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 3000;

app.use(bodyParser.json());

app.get("/promotions", validateCode, Rotes.handleGetPromotions);

app.get("/promotions/checkduplicate", validateCode, Rotes.handleCheckDuplicate);

app.post("/promotions", validatePromotion, Rotes.handleInsertPromotion);

app.put("/promotions", validatePromotion, Rotes.handleUpdatePromotion);

app.delete("/promotions", validateCode, Rotes.handleDeletePromotion);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
