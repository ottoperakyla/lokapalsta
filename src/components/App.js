import React from 'react'
import { Router, Route } from 'react-router'
import createHistory from 'history/createHashHistory'
import { APP_NAME } from '../constants'
import Post from './Post'
import PostsList from './PostsList'
import { Link } from 'react-router-dom'

const history = createHistory()

const App = (props) => {
  return (
  <div className="container mt-5">
    <Router history={history}>
      <div>
        <h2 style={styles.heading}><Link to="/">{APP_NAME}</Link></h2>
        <Route exact path="/" component={PostsList} />
        <Route path="/posts/:id" component={Post} />
      </div> 
    </Router>
  </div>
  )
}

const styles = {
  heading: {
    color: 'hotpink'
  }
}

export default App
