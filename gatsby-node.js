const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const restaurantPage = path.resolve(`./src/templates/restaurantPage.js`)
}
