/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import layoutStyles from "./layout.module.scss"
import "./index.scss"

import Header from "./header"

function Layout(props: LayoutProps) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={layoutStyles.main}>
        <div>
          <main>{props.children}</main>
          <div className={layoutStyles.contact}>
            Contact us with suggestions or feedback at{" "}
            <a href="mailto:richmondhappyhours@gmail.com">
              richmondhappyhours@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

interface LayoutProps {
  children: any
}

export default Layout
