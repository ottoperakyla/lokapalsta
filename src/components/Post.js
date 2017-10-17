import React, { Component } from 'react'
import { fetchPost } from '../api'
import Reply from './Reply'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: { replies: [] },
      postID: props.match.params.id
    }
  }

  componentWillMount() {
    fetchPost(this.state.postID).then((response) => {
      this.setState({ post: response.data.post })
    })
  }

  urlify(text) {
    if (typeof text !== 'string') {
      return '';
    }

    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
  }
  

  render() {
    const renderReply = ({ id, title, text, timestamp }) => {
      return (
        <li key={id} className="list-group-item">
            <h4>
                {title}
                <small>@{timestamp}</small>
            </h4>
            <p className="w-100" dangerouslySetInnerHTML={{__html: this.urlify(text)}}></p>
        </li>
      )
    }

    return (
      <div className="posts-list">
        <h3>Post</h3>
        <ul className="list-group">
            {renderReply(this.state.post)}
            {this.state.post.replies.map(renderReply)}
        </ul>
        <Reply refreshView={this.componentWillMount.bind(this)} postID={this.state.postID} />
      </div>
    )
  }
}

export default Post
