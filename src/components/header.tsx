import { Link } from "gatsby"
import * as React from "react"
import headerStyles from "./header.module.scss"

const Header = (props: HeaderProps) => (
  <header className={headerStyles.header}>
    <div className={headerStyles.headerContainer}>
      <h1>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {props.siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

interface HeaderProps {
  siteTitle?: string
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
