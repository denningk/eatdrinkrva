import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import restaurantStyles from "./restaurantPage.module.scss"
import SpecialsTimeTable from "../components/specialsTimeTable"

function RestaurantPageTemplate(props: RestaurantPageTemplate) {
  const restaurant = props.data.contentfulRestaurant

  return (
    <Layout>
      <SEO title={restaurant.name + " Food and Drink Specials"} />
      <h3>
        <Link className={restaurantStyles.back} to={`/`}>
          Back
        </Link>
      </h3>
      <h1 className={restaurantStyles.restaurant}>{restaurant.name}</h1>
      <h3 className={restaurantStyles.description}>
        {restaurant.description && restaurant.description.internal.content}
      </h3>
      <SpecialsTimeTable happyHours={restaurant.happyHours} />
      <iframe
        className={restaurantStyles.mapFrame}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURI(
          restaurant.name + " Richmond"
        )}&key=${process.env.GATSBY_GOOGLE_API_KEY}`}
        allowFullScreen
      />
    </Layout>
  )
}

interface RestaurantPageTemplate {
  data: any
}

export default RestaurantPageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulRestaurant(fields: { slug: { eq: $slug } }) {
      name
      description {
        internal {
          content
        }
      }
      happyHours {
        special
        specials
        timeSlot {
          startEndTime
          daily
          frequency
          allDay
        }
      }
    }
  }
`
