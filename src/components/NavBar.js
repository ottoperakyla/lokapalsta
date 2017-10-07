import React from 'react'
import { NavLink } from 'react-router-dom'

export default (props) => {
  return (
   <ul className="nav">
    <li className="nav-item">
      <NavLink to="/" 
      className="nav-link"
      activeClassName="active">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/posts" 
      className="nav-link"
      activeClassName="active">Posts</NavLink>
    </li>
  </ul>
  )
}
