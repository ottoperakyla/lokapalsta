import React, { Component } from 'react'
import { fetchPosts } from '../api'
import { Link } from 'react-router-dom'
import Timestamp from './Timestamp'

class PostsList extends Component {
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
  

  render() {
    const renderPost = ({ id, title, description, timestamp }) => {
      return (
        <li key={id} className="list-group-item">
          <Link to={`/posts/${id}`}>
            <h4>{title}
              <Timestamp timestamp={timestamp} />
            </h4>
          </Link>
        </li>
      )
    }

    return (
      <div className="posts-list">
        <h3>Posts</h3>
        <ul className="list-group">
          {this.state.posts.map(renderPost)}
        </ul>
      </div>
    )
  }
}

export default PostsList
