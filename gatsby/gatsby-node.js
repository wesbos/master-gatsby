import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve(`./src/templates/Pizza.js`);

  const { data } = await graphql(`
    query {
      allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // creates pages for each pizza!
  data.allSanityPizza.nodes.forEach(pizza => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        name: pizza.name,
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve(`./src/pages/pizzas.js`);

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          vegan
          id
        }
      }
    }
  `);

  // creates pages for each pizza!
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/gi`,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await turnPizzasIntoPages({ graphql, actions });
  await turnToppingsIntoPages({ graphql, actions });
};
