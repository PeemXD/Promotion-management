class Promotion {
  constructor(
    code,
    name,
    descriptions,
    starttime,
    endtime,
    limit_amount,
    limit_type,
    price_per_typeP,
    days,
    can_reduce
  ) {
    this.code = code;
    this.name = name;
    this.descriptions = descriptions;
    this.starttime = starttime;
    this.endtime = endtime;
    this.limit_amount = limit_amount;
    this.limit_type = limit_type;
    this.price_per_typeP = price_per_typeP;
    this.days = days;
    this.can_reduce = can_reduce;
  }
}

export default Promotion;
