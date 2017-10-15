import React, { Component } from 'react'
import serialize from 'form-serialize'
import { createPost } from '../api'

class Reply extends Component {
  constructor(props) {
    super(props)
    this.refreshView = props.refreshView;
    this.state = {
      postID: props.postID
    }
    this.history = props.history
  }
  
  sendPost(e) {
    e.preventDefault();
    const self = this;
    const data = serialize(e.target, { hash: true })
    e.target.reset() // Empty form

    createPost(data).then((response) => {
      if (typeof data.id === 'undefined') {
        // This is not a reply but a new post. Go to post.
        self.history.push('/posts/' + response.data.id)
      }
      else {
        // This is a reply. Update data
        self.refreshView()
      }
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <h4 style={styles.heading}>Snapchat your database</h4>
        <form onSubmit={this.sendPost.bind(this)}>
          { this.state.postID
            ? <input type="hidden" name="id" value={this.state.postID} />
            : <input type="text" name="title" className="w-100" style={styles.input} />
          }
          <textarea className="w-100" name="text" style={styles.textarea} ref={(input) => { this.textarea = input }}></textarea><br />
          <button type="submit">Snap</button>
        </form>
      </div>
    )
  }
}

const styles = {
  heading: {
    color: 'blue'
  },
  textarea: {
    maxWidth: '500px',
    height: '150px'
  },
  input: {
    maxWidth: '500px'
  }
}

export default Reply
