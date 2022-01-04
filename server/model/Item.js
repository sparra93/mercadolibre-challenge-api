import Prices from "./Prices";

export default class Item {
  constructor(props) {
    this.id = props?.id ?? "";
    this.title = props?.title ?? "";
    this.picture = props?.thumbnail ?? "";
    this.condition = props?.condition ?? "";
    this.free_shipping = props?.shipping?.free_shipping ?? false;
    this.price = new Prices(props);
    this.sold_quantity = props?.sold_quantity ?? "";
    this.description = props?.description?.plain_text ?? "";
  }
}
