import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"
import SpecialsTimeTable from "../components/specialsTimeTable"
import { create } from "react-test-renderer"

function IndexPage(props: IndexProps) {
  const { data } = props

  const restaurants = data.allContentfulRestaurant.edges

  const createMapsLink = (location: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
      location
    )}`
  }
  return (
    <Layout>
      <SEO title="Home" />
      <div className={indexStyles.indexText}>
        Food and drink specials found all over Richmond, VA 😋
      </div>
      {restaurants.map(({ node }: { node: RestaurantNode }) => (
        <div
          className={indexStyles.link}
          key={node.name}
          // to={data.site.siteMetadata.happyHourPath + node.fields.slug}
        >
          <div className={indexStyles.restaurantContainer}>
            <div className={indexStyles.restaurantWithIcon}>
              <h2 className={indexStyles.restaurant}>{node.name}</h2>
              <div>
                <a
                  href={createMapsLink(node.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={props.data.file.publicURL} />
                </a>
              </div>
            </div>
            <SpecialsTimeTable happyHours={node.happyHours} />
          </div>
        </div>
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
    file(relativePath: { eq: "outline-directions-24px.svg" }) {
      publicURL
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
