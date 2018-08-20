import React from 'react'

export default class AppNav extends React.Component {
  getNavContents() {
    return (
      <nav className="main-nav">
        <h1>Dan Foad</h1>
        <ul className="main-nav__links">
          <li>Home</li>
          <li>Projects</li>
          <li>CV</li>
          <li>Blog</li>
          <li>Contact Me</li>
        </ul>
      </nav>
    )
  }
  
  render() {
    return this.getNavContents()
  }
}