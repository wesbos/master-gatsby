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
    console.log(pizza);
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
          vegetarian
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

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const template = path.resolve(`./src/templates/Slicemaster.js`);

  const { data } = await graphql(`
    query {
      allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // creates pages for each person!
  data.allSanityPerson.nodes.forEach(person => {
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: template,
      context: {
        name: person.name,
        slug: person.slug.current,
      },
    });
  });

  // Paginate Slicemasters
  const perPage = 2;
  const pageCount = Math.ceil(data.allSanityPerson.totalCount / perPage);
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * perPage,
        currentPage: i + 1,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    turnPizzasIntoPages({ graphql, actions }),
    turnToppingsIntoPages({ graphql, actions }),
    turnSlicemastersIntoPages({ graphql, actions }),
  ]);
};
