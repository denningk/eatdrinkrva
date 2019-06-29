import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

function IndexPage(props: IndexProps) {
  const { data } = props

  const restaurants = data.allRestaurantsJson.edges
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {restaurants.map(({ node }: { node: restaurantNode }) => (
        <h1>
          <a href={node.siteURL} target="_blank">
            {node.name}
          </a>
        </h1>
      ))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

interface IndexProps {
  data: any
}

interface restaurantNode {
  name?: string
  siteURL?: string
  happyHour?: happyHour[]
}

interface happyHour {
  special: string
  frequency: string
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allRestaurantsJson {
      edges {
        node {
          name
          siteURL
        }
      }
    }
  }
`
