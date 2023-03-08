class Promotion {
  constructor(
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
    this.code = code;
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.limit_amount = limit_amount;
    this.limitType = limitType;
    this.price_per_typeP = price_per_typeP;
    this.promotion_by_day = promotion_by_day;
    this.can_reduce = can_reduce;
  }
}

export default Promotion;
