import React from 'react'
import serialize from 'form-serialize'
import { createPost, fetchPost } from '../api'

const Reply = (props) => {
  const sendPost = (e) => {
    e.preventDefault();
    var data = serialize(e.target, { hash: true })
    createPost(data).then((response) => {
      if (typeof data.id === 'undefined') {
        // This is not a reply but a new post. Go to post.
        props.history.push('/posts/' + response.data.id)
      }
      else {
        // This is a reply. Update data
        fetchPost(this.state.postID).then((response) => {
          this.setState({ post: response.data.post })
        })
      }
    })
  }

  return (
    <div className="container mt-5">
      <h4 style={styles.heading}>Snapchat your database</h4>
      <form onSubmit={sendPost}>
        { props.match.params.id
          ? <input type="hidden" name="id" value={props.match.params.id} />
          : <input type="text" name="title" className="w-100" style={styles.input} />
        }
        <textarea className="w-100" name="text" style={styles.textarea}></textarea><br />
        <button type="submit">Snap</button>
      </form>
    </div>
  )
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
