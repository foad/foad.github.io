import React from 'react'

export default class AppNav extends React.Component {
  getNavContents() {
    return (
      <nav className="main-nav">
        <h1 className="main-nav__title">
          <a href="/">Dan Foad :: <span>Associate Software Developer</span></a>
          <div className="main-nav__edge" />
        </h1>
        <div className="main-nav__slant" />
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