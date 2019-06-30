const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `RestaurantsJson`) {
    const slug = `/${node.name.replace(/\W+/g, "-").toLowerCase()}/`
    console.log(encodeURI(slug))
    createNodeField({
      node,
      name: `slug`,
      value: encodeURI(slug),
    })
  }
}

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   const restaurantPage = path.resolve(`./src/templates/restaurantPage.js`)

//   return graphql(
//     `
//       {
//           allRestaurantsJson {
//               edges {
//                   node {

//                   }
//               }
//           }
//       }
//       `
//   )
// }
