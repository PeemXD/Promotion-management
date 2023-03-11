export const validatePromotion = (req, res, next) => {
  const { code, name, description, limit_amount, price_per_typeP, can_reduce } =
    req.body;

  // Check if code, name and description are present in the request body
  if (!code || !limit_amount || !price_per_typeP[0]) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Check if code, name, and description only contain characters and numbers
  const pattern = /^[a-zA-Z0-9]*$/;
  if (!pattern.test(code)) {
    return res.status(400).json({
      error:
        "Code, name, and description do not only contain characters and numbers",
    });
  }

  // check limit_amount is number
  if (isNaN(limit_amount)) {
    return res.status(400).json({ error: "limit_amount is not number" });
  }

  // check all reduce in price_per_typeP is number
  for (const data of price_per_typeP) {
    if (isNaN(data.reduce)) {
      return res.status(400).json({ error: "reduce is not number" });
    }
  }

  // If all checks pass, move on to the next middleware
  next();
};

export const validateCode = (req, res, next) => {
  const { code } = req.body;

  // Check if name and age are present in the request body
  if (!code) {
    const pattern = /^[a-zA-Z0-9]*$/;
    if (!pattern.test(code)) {
      return res.status(400).json({
        error:
          "Code, name, and description do not only contain characters and numbers",
      });
    }
  }

  // If all checks pass, move on to the next middleware
  next();
};
