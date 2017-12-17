import * as R from 'ramda'
import React, { Component } from 'react'
import { fetchPosts } from '../api'
import { Link } from 'react-router-dom'
import Timestamp from './Timestamp'
import Reply from './Reply'
import Sorting from './Sorting'

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      sortingActive: false
    }
    this.toggleSorting = this.toggleSorting.bind(this)
  }

  componentWillMount() {
    fetchPosts().then((response)=>{
      this.setState({ posts: response.data.posts })
    })
  }

  toggleSorting() {
    this.setState({ sortingActive: !this.state.sortingActive })
  }

  render() {
    const read = R.defaultTo({}, JSON.parse(localStorage.getItem('read')))
    
    const renderPost = ({ id, title, description, timestamp, repliesLen }) => {
      const unreadPost = !read.hasOwnProperty(id)
      let unreadCount = repliesLen
      if (read[id]) unreadCount -= read[id]
      const hide = this.state.sortingActive && !unreadCount

      return (
        <li key={id} className="list-group-item" style={{display: hide ? 'none' : 'flex'}}>
          <Link to={`/posts/${id}`}>
            <h4>{title}
              <Timestamp timestamp={timestamp} />
              {unreadPost && <span className="ml-4 badge badge-primary">new</span>}
              {unreadCount > 0 && <span className="ml-4 badge badge-primary">{unreadCount}</span>}
            </h4>
          </Link>
        </li>
      )
    }

    return (
      <div className="posts-list">
        <h3>Posts</h3>
        <Sorting toggle={this.toggleSorting} />
        <ul className="list-group">
          {this.state.posts.map(renderPost)}
        </ul>
        <Reply history={this.props.history} />
      </div>
    )
  }
}

export default PostsList
