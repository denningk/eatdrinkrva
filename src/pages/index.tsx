import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"

function IndexPage(props: IndexProps) {
  const { data } = props

  const restaurants = data.allContentfulRestaurant.edges
  return (
    <Layout>
      <SEO title="Home" />
      <div className={indexStyles.indexText}>
        Food and drink specials found all over Richmond, VA 😋
      </div>
      {restaurants.map(({ node }: { node: RestaurantNode }) => (
        <Link
          className={indexStyles.link}
          key={node.name}
          to={data.site.siteMetadata.happyHourPath + node.fields.slug}
        >
          <div className={indexStyles.restaurantContainer}>
            <h2 className={indexStyles.restaurant}>
              {node.name}{" "}
              <span className={indexStyles.emoji}>{node.emoji}</span>
            </h2>
            <ul>
              {node.happyHours.map((happyHour: any) => (
                <li className={indexStyles.special} key={happyHour.special}>
                  {happyHour.frequency}: {happyHour.special}
                </li>
              ))}
            </ul>
          </div>
        </Link>
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
  emoji?: string
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
    allContentfulRestaurant {
      edges {
        node {
          fields {
            slug
          }
          name
          siteUrl
          emoji
          happyHours {
            special
            frequency
            allDay
          }
        }
      }
    }
  }
`
