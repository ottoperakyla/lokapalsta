import React, { Component } from 'react'
import { APP_NAME } from '../constants'
import Reply from './Reply'
import { fetchPosts } from '../api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    fetchPosts().then((response) => {
      this.setState({ posts: response.data.posts })
    })
  }
  
  render(){ 
    return (
    <div className="container mt-5">
      <h2 style={styles.heading}>{APP_NAME}</h2>
      <p>TODO: render posts {JSON.stringify(this.state.posts)}</p>
      <Reply/>
    </div>
    )
  }
}

const styles = {
  heading: {
    color: 'hotpink'
  }
}

export default App
