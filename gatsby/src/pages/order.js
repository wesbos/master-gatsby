import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrderStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .span-2 {
    grid-column: span 2;
  }
  fieldset {
    max-height: 600px;
    overflow: auto;
    display: grid;
    grid-gap: 1rem;
    align-content: start;
  }
`;
const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--grey);
  grid-gap: 0 2rem;
  align-content: center;
  align-items: center;
  min-height: 100px;
  position: relative;
  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }
  p {
    margin: 0;
  }
  button {
    font-size: 1.5rem;
    & + button {
      margin-left: 1rem;
    }
    &.remove {
      background: white;
      color: var(--red);
      font-size: 3rem;
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: none;
      line-height: 1rem;
    }
  }
`;

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
  return pizzas.find(pizza => pizza.id === id);
}

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  const { order, addToOrder, removeFromOrder } = usePizza(pizzas);
  return (
    <div>
      <h2>Order!</h2>
      <OrderStyles>
        <fieldset className="span-2">
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" nane="name" />
          <label htmlFor="email">email</label>
          <input type="email" nane="email" />
        </fieldset>
        <fieldset>
          <legend>Your Order</legend>
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
                  {formatMoney(
                    calculatePizzaPrice(pizza.price, singleOrder.size)
                  )}
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
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map(pizza => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid}></Img>
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      addToOrder({ id: pizza.id, size });
                    }}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="span-2">
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}.
          </h3>
          <button type="submit">Order Ahead!</button>
        </fieldset>
      </OrderStyles>
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
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
