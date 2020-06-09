import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

function findPizzaById(pizzas, id) {
  return pizzas.find(pizza => pizza.id === id);
}

export default function PizzaOrder({
  order,
  pizzas,
  removeFromOrder,
  plainImage,
}) {
  return (
    <>
      {order.map(function(singleOrder, index) {
        const pizza = findPizzaById(pizzas, singleOrder.id);
        return (
          <MenuItemStyles key={`${index}-${pizza.id}`}>
            <Img fluid={pizza.image.asset.fluid}></Img>
            <div>
              <h2>
                {pizza.name} - {singleOrder.size}
              </h2>
            </div>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                onClick={() => removeFromOrder(index)}
                title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
