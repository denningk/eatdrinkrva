import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"
import SingleRestaurant from "../components/singleRestaurant"

function IndexPage(props: IndexProps) {
  const { data } = props

  const restaurants = data.allContentfulRestaurant.edges

  return (
    <Layout>
      <SEO title="Richmond Food and Drink Specials" />
      <h2 className={indexStyles.indexText}>
        Food and drink happy hour specials found all over Richmond, VA 😋 New
        specials added daily!
      </h2>
      <div>
        {restaurants.map(({ node }: { node: RestaurantNode }, id: number) => (
          <SingleRestaurant
            key={id}
            node={node}
            sitePath={data.site.siteMetadata.happyHourPath}
          />
        ))}
      </div>
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
    file(relativePath: { eq: "outline-directions-24px.svg" }) {
      publicURL
    }
    allContentfulRestaurant(sort: { fields: [name], order: ASC }) {
      edges {
        node {
          fields {
            slug
          }
          name
          siteUrl
          happyHours {
            specials
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
