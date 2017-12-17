import * as R from 'ramda'
import React, { Component } from 'react'
import { fetchPost } from '../api'
import Reply from './Reply'
import Timestamp from './Timestamp'
import { escape } from "lodash";

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: { replies: [] },
      postID: props.match.params.id
    }
    // Poller needs to check if we are on this page or not. This regex does that.
    this.urlRegExp = new RegExp('/posts/' + this.state.postID)
    this.startPoller(5);
  }

  startPoller(interval) {
    this.poller = window.setInterval(this.componentWillMount.bind(this), interval * 1000)
  }

  stopPoller() {
    window.clearInterval(this.poller)
  }

  // Check if we are still on this page
  isActive() {
    return this.urlRegExp.test(window.location.href)
  }

  componentWillMount() {
    if (this.isActive()) {
      fetchPost(this.state.postID).then((response) => {
        this.setState({ post: response.data.post }) 
      })
    }
    else {
      this.stopPoller();
    }
  }

  setRead() {
    const read = R.defaultTo({}, JSON.parse(localStorage.getItem('read')));
    read[this.state.postID] = this.state.post.replies.length
    localStorage.setItem('read', JSON.stringify(read))   
  }

  urlify(text) {
    if (typeof text !== 'string') {
      return '';
    }

    // Escape html
    text = escape(text);

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
  }
  

  render() {
    this.setRead()
    const renderReply = ({ id, title, text, timestamp }) => {
      return (
        <li key={id} className="list-group-item">
            <h4>
                {title}
                <Timestamp timestamp={timestamp} />
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
