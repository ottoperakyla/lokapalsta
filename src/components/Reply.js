import React, { Component } from 'react'
import serialize from 'form-serialize'
import { createPost } from '../api'

class Reply extends Component {
  constructor(props) {
    super(props)
    this.refreshView = props.refreshView;
    this.state = {
      postID: props.postID,
      errors: {}
    }
    this.history = props.history
  }

  validate(data) {
    let errors = {}

    if ( !data.title ) {
      errors.title = 'Please fill in title'
    }

    if ( !data.text ) {
      errors.text = 'Please fill in text'
    }
    
    this.setState({ errors })
  } 
  
  sendPost(e) {
    e.preventDefault();
    const self = this;
    const data = serialize(e.target, { hash: true })
    /*const errors = this.validate(data)

    console.log('errors', data, errors)

    if ( Object.keys(this.state.errors).length > 0 ) {
      return false
    }*/

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
        <form className="form" onSubmit={this.sendPost.bind(this)}>
          { this.state.postID
            ? <input type="hidden" name="id" value={this.state.postID} />
            : <div className="form-group"><label htmlFor="title">Title</label><input type="text" name="title" id="title" className="form-control w-100" style={styles.input} />
            {this.state.errors.title && <div className="alert alert-danger" role="alert">
              {this.state.errors.title}
            </div>}
            </div>
          }
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea className="form-control w-100" id="text" name="text" style={styles.textarea}></textarea>
            {this.state.errors.text && <div className="alert alert-danger" role="alert">
              {this.state.errors.text}
            </div>}
          </div>
          <button className="btn btn-primary" type="submit">Snap</button>
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
    height: '150px',
    resize: 'none'
  },
  input: {
    maxWidth: '500px'
  }
}

export default Reply
