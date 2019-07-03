import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"

function IndexPage(props: IndexProps) {
  const { data } = props

  const restaurants = data.allRestaurantsJson.edges
  return (
    <Layout>
      <SEO title="Home" />
      {restaurants.map(({ node }: { node: RestaurantNode }) => (
        <>
          <h2 key={node.name}>
            <Link
              className={indexStyles.restaurant}
              to={data.site.siteMetadata.happyHourPath + node.fields.slug}
            >
              {node.name}
            </Link>
          </h2>
          <ul>
            {node.happyHours.map((happyHour: any) => (
              <li className={indexStyles.special} key={happyHour.special}>
                {happyHour.frequency}: {happyHour.special}
              </li>
            ))}
          </ul>
        </>
      ))}
    </Layout>
  )
}

interface IndexProps {
  data: any
}

interface RestaurantNode {
  name?: string
  siteURL?: string
  happyHours?: HappyHour[]
  fields?: any
}

interface HappyHour {
  special: string
  frequency: string
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        happyHourPath
      }
    }
    allRestaurantsJson {
      edges {
        node {
          fields {
            slug
          }
          name
          siteURL
          happyHours {
            special
            frequency
          }
        }
      }
    }
  }
`
