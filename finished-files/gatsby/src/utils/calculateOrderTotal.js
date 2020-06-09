import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}
