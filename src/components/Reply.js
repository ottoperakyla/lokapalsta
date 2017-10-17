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

  showErrors(errors) {
    console.log('showErrors', errors)
  }

  validate(data) {
    let errors = {}

    if ( !data.title ) {
      errors.title = 'Please fill in title'
    }

    if ( !data.text ) {
      errors.text = 'Please fill in text'
    }
    
    return errors
  } 
  
  sendPost(e) {
    e.preventDefault();
    const self = this;
    const data = serialize(e.target, { hash: true })
<<<<<<< HEAD
    const errors = this.validate(data)

    if ( Object.keys(errors).length > 0 ) {
      this.showErrors(errors)
      return false
    }
=======
    e.target.reset() // Empty form
>>>>>>> 9d47db0738ad0aa505a8cbc5561b247d5e1f3889

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
            : <div className="form-group"><label htmlFor="title">Title</label><input type="text" name="title" id="title" className="form-control w-100" style={styles.input} /></div>
          }
<<<<<<< HEAD
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea className="form-control w-100" id="text" name="text" style={styles.textarea}></textarea>
          </div>
          <button className="btn btn-primary" type="submit">Snap</button>
=======
          <textarea className="w-100" name="text" style={styles.textarea} ref={(input) => { this.textarea = input }}></textarea><br />
          <button type="submit">Snap</button>
>>>>>>> 9d47db0738ad0aa505a8cbc5561b247d5e1f3889
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
