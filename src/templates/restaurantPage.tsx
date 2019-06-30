import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

function RestaurantPageTemplate(props: RestaurantPageTemplate) {
  const restaurant = props.data.restaurantsJson

  return (
    <Layout>
      <SEO title={restaurant.name} />
      <h1>{restaurant.name}</h1>
      <div>
        {restaurant.happyHours.map((happyHour: any) => (
          <div key={happyHour.special}>
            {happyHour.frequency}: {happyHour.special}
          </div>
        ))}
      </div>
      <a href={restaurant.siteURL}>Visit restaurant website.</a>
      <Link to={`/`}>Return to EatDrinkRVA</Link>
    </Layout>
  )
}

interface RestaurantPageTemplate {
  data: any
}

export default RestaurantPageTemplate

export const pageQuery = graphql`
  query RestaurantBySlug($slug: String!) {
    restaurantsJson(slug: { eq: $slug }) {
      name
      siteURL
      happyHours {
        special
        frequency
      }
    }
  }
`
