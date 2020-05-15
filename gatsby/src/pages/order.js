import React, { useState, useContext } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import PizzaOrder from '../components/PizzaOrder';
import MenuItemStyles from '../styles/MenuItemStyles';
import attachNamesAndPrices from '../utils/attachNamesAndPrices';
import SEO from '../components/SEO';
import OrderContext from '../components/OrderContext';

const OrderStyles = styled.form`
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

function usePizza({ pizzas, inputs }) {
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: attachNamesAndPrices(order, pizzas),
          total: formatMoney(calculateOrderTotal(order, pizzas)),
          name: inputs.name,
          email: inputs.email,
          mapleSyrup: inputs.mapleSyrup,
        }),
      }
    );

    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      console.log(text);
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}

function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return {
    values,
    updateValue,
  };
}

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
    description: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    orderRef,
    error,
    message,
    loading,
  } = usePizza({ pizzas, inputs: values });
  const x = useContext(OrderContext);

  console.log(x);

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <div>
      <SEO title="Order Ahead"></SEO>
      <h2>Order!</h2>
      <OrderStyles onSubmit={submitOrder}>
        <fieldset className="span-2">
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            value={values.name}
            onChange={updateValue}
            type="text"
            name="name"
          />
          <label htmlFor="email">email</label>
          <input
            value={values.email}
            onChange={updateValue}
            type="email"
            name="email"
          />
          <input
            type="text"
            name="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset>
          <legend>Your Order</legend>
          <PizzaOrder
            order={attachNamesAndPrices(order, pizzas)}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map(pizza => (
            <MenuItemStyles key={pizza.id} ref={orderRef}>
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
          <div>{error && <p>Error: {error}</p>}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order' : 'Order Ahead!'}
          </button>
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
