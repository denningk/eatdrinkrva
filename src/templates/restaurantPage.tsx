import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import restaurantStyles from "./restaurantPage.module.scss"

function RestaurantPageTemplate(props: RestaurantPageTemplate) {
  const restaurant = props.data.contentfulRestaurant

  return (
    <Layout>
      <SEO title={restaurant.name} />
      <h3>
        <Link className={restaurantStyles.back} to={`/`}>
          Back
        </Link>
      </h3>
      <h1 className={restaurantStyles.restaurant}>{restaurant.name}</h1>
      <h3 className={restaurantStyles.description}>
        {restaurant.description.internal.content}
      </h3>
      <ul>
        {restaurant.happyHours.map((happyHour: any) => (
          <li className={restaurantStyles.special} key={happyHour.special}>
            {happyHour.frequency}: {happyHour.special}
          </li>
        ))}
      </ul>
      <br />
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
        frequency
      }
    }
  }
`
