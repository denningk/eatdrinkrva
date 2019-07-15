import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"
import SpecialsTimeTable from "../components/specialsTimeTable"

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
            <h2 className={indexStyles.restaurant}>{node.name}</h2>
            <SpecialsTimeTable happyHours={node.happyHours} />
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
          happyHours {
            special
            timeSlot {
              startEndTime
              daily
              frequency
              allDay
            }
          }
        }
      }
    }
  }
`
