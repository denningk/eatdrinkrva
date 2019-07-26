import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import indexStyles from "./indexPage.module.scss"
import SpecialsTimeTable from "../components/specialsTimeTable"
import DirectionsLogo from "../images/outline-directions-24px.svg"
import InfoLogo from "../images/outline-info-24px.svg"

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
        <div className={indexStyles.link} key={node.name}>
          <div className={indexStyles.restaurantContainer}>
            <div className={indexStyles.restaurantWithIcon}>
              <h2 className={indexStyles.restaurant}>{node.name}</h2>
              <div>
                <Link
                  to={data.site.siteMetadata.happyHourPath + node.fields.slug}
                >
                  <InfoLogo />
                </Link>
                <a
                  href={createMapsLink(node.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DirectionsLogo />
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
