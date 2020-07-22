import calculatePizzaPrice from './calcuatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
