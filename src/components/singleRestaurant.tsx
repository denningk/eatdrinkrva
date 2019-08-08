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
    <div className={restaurantStyles.link} key={props.node.name}>
      <div className={restaurantStyles.restaurantContainer}>
        <div className={restaurantStyles.restaurantWithIcon}>
          <Link
            className={restaurantStyles.link}
            to={props.sitePath + props.node.fields.slug}
          >
            <h2 className={restaurantStyles.restaurant}>{props.node.name}</h2>
          </Link>
          <div>
            <Link to={props.sitePath + props.node.fields.slug}>
              <InfoLogo />
            </Link>
            <a
              href={createMapsLink(props.node.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DirectionsLogo />
            </a>
          </div>
        </div>
        <SpecialsTimeTable happyHours={props.node.happyHours} />
      </div>
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
