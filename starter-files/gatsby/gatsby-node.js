import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get template for this Pizza
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the url for this new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: `${pizza.slug.current}`,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // 1. Get the templates
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. create page for topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the url for this new page
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Loop over all toppings
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // 1. fetch a list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    // 3. Create a node for beers
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({ ...beer, ...nodeMeta });
  }
};

export const sourceNodes = async (params) => {
  // 1. fetch a list of beers and source them into our gatsby api
  const beers = fetchBeersAndTurnIntoNodes(params);

  await Promise.all([beers]);
};

export const createPages = async (params) => {
  console.log('Creating pages');
  // 1. Pizzas
  const pizzaPages = turnPizzasIntoPages(params);
  // 2. Toppings
  const toppingPages = turnToppingsIntoPages(params);
  // 3. Slicemasters

  await Promise.all([pizzaPages, toppingPages]);
};
