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
      <ul>
        {/* {restaurant.happyHour.map((special) => (
          <li>{special.special}</li>
        ))} */}
      </ul>
      <Link to={`/`}>Return Home</Link>
    </Layout>
  )
}

interface RestaurantPageTemplate {
  data: any
}

export default RestaurantPageTemplate

export const pageQuery = graphql`
  query RestaurantBySlug($slug: String!) {
    restaurantsJson(name: { eq: "Foo Dog" }) {
      name
      happyHour {
        special
        frequency
      }
    }
  }
`
