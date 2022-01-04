export default class Prices {
  constructor(props) {
    this.amount = props?.price ?? "";
    this.currency = props?.currency?.currency ?? "";
    this.decimals = props?.currency?.decimal ?? "";
  }
}
