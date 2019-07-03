import { Link } from "gatsby"
import * as React from "react"
import headerStyles from "./header.module.scss"

const Header = (props: HeaderProps) => (
  <header className={headerStyles.header}>
    <h1>
      <Link to="/" className={headerStyles.siteTitle}>
        {props.siteTitle}
      </Link>
    </h1>
  </header>
)

interface HeaderProps {
  siteTitle?: string
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
