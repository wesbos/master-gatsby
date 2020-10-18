import path from 'path';

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

export const createPages = async (params) => {
  console.log('Creating pages');
  // 1. Pizzas
  const pizzaPages = turnPizzasIntoPages(params);
  // 2. Toppings
  const toppingPages = turnToppingsIntoPages(params);
  // 3. Slicemasters

  await Promise.all([pizzaPages, toppingPages]);
};
