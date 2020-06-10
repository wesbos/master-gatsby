const path = require('path');
const fetch = require('isomorphic-fetch');

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
  data.allSanityPizza.nodes.forEach((pizza) => {
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
  data.toppings.nodes.forEach((topping) => {
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
  data.allSanityPerson.nodes.forEach((person) => {
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
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  console.log(`---------xx---------`);
  console.log(pageSize);
  console.log(`------------------`);
  const pageCount = Math.ceil(data.allSanityPerson.totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch the list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  console.log(`Going to Turn ${beers.length} into nodes`);
  // 2. Loop over each one
  for (const beer of beers) {
    // Create the node for each beer
    const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null, // this beer does't have a parent
      children: [], // no children either
      internal: {
        type: 'Beer', // Name of node type
        mediaType: 'application/json', // this is so that other plugins that are looking for this type of media can find it. We don't use this, but it's good to set it.
        contentDigest: createContentDigest(beer),
      },
    };
    // merge the beer along with the metadata we just created
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

// TODO can I use ES syntax here?
// Do these things when Gatsby goes to create pages
exports.createPages = async function (params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};

// Do these things when gatsby wants to creat new nodes
exports.sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};
