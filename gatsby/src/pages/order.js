import React, { useState } from 'react';
import { graphql } from 'gatsby';

function usePizza(inventory) {
  const [order, setOrder] = useState([]);

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}

function findPizzaById(pizzas, id) {
  console.log(pizzas, id);
  return pizzas.find(pizza => pizza.id === id);
}

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  const { order, addToOrder, removeFromOrder } = usePizza(pizzas);
  return (
    <div>
      <h2>Order!</h2>
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" nane="name" />
          <label htmlFor="email">email</label>
          <input type="email" nane="email" />
        </fieldset>
        <fieldset>
          <legend>Your Order</legend>
          <p>You have {order.length} items in your order</p>
          {order.map(function(singleOrder, index) {
            const pizza = findPizzaById(pizzas, singleOrder.id);
            console.log(pizza);
            return (
              <div key={`${index}-${pizza.id}`}>
                {pizza.name} - {singleOrder.size}
                <button type="button" onClick={() => removeFromOrder(index)}>
                  X
                </button>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>Add Some More</legend>
          {pizzas.map(pizza => (
            <div key={pizza.id}>
              <p>{pizza.name}</p>
              {['S', 'M', 'L'].map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => {
                    addToOrder({ id: pizza.id, size });
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          ))}
        </fieldset>
        <fieldset>
          <button type="submit">Order Ahead!</button>
        </fieldset>
      </form>
    </div>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 50) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
