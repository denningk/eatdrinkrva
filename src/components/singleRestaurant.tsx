import * as React from "react"

import { Link } from "gatsby"
import SpecialsTimeTable from "../components/specialsTimeTable"
import DirectionsLogo from "../images/outline-directions-24px.svg"
import InfoLogo from "../images/outline-info-24px.svg"
import restaurantStyles from "./singleRestaurant.module.scss"

function SingleRestaurant(props: SingleResstaurantProps) {
  const createMapsLink = (location: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
      location + " Richmond"
    )}`
  }

  return (
    <div key={props.node.name} className={restaurantStyles.restaurantContainer}>
      <div className={restaurantStyles.restaurantWithIcon}>
        <div className={restaurantStyles.restaurantName}>
          <Link
            aria-label={`More details about ${props.node.name}`}
            className={restaurantStyles.link}
            to={props.sitePath + props.node.fields.slug}
          >
            <h2 className={restaurantStyles.restaurant}>{props.node.name}</h2>
          </Link>
        </div>
        <div className={restaurantStyles.logoContainer}>
          <Link
            aria-label={`More details about ${props.node.name}`}
            to={props.sitePath + props.node.fields.slug}
          >
            <InfoLogo className={restaurantStyles.logo} />
          </Link>
          <a
            aria-label={`Directions to ${props.node.name}`}
            href={createMapsLink(props.node.name)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DirectionsLogo className={restaurantStyles.logo} />
          </a>
        </div>
      </div>
      <SpecialsTimeTable happyHours={props.node.happyHours} />
    </div>
  )
}

export default SingleRestaurant

interface SingleResstaurantProps {
  node: RestaurantNode
  sitePath: string
}

interface RestaurantNode {
  name?: string
  siteURL?: string
  happyHours?: HappyHour[]
  fields?: any
}
