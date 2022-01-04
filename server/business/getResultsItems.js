import Item from "../model/Item";

/**
 * @param  {Object} props - Dynamic object
 * Create and digest data to the cliente
 */
export default (props) => {
  const {
    results, currency, description, categories,
  } = props;
  const items = results.map((result) => new Item({ ...result, currency, description }));
  return {
    categories,
    items,
  };
};
