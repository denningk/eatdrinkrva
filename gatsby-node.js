const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `RestaurantsJson`) {
    const slug = `${node.name.replace(/\W+/g, "-").toLowerCase()}/`
    createNodeField({
      node,
      name: `slug`,
      value: encodeURI(slug),
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        site {
          siteMetadata {
            happyHourPath
          }
        }
        allRestaurantsJson {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allRestaurantsJson.edges.forEach(({ node }) => {
      createPage({
        path: result.data.site.siteMetadata.happyHourPath + node.fields.slug,
        component: path.resolve(`./src/templates/restaurantPage.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}
