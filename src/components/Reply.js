import React, { Component } from 'react'
import serialize from 'form-serialize'
import { createPost } from '../api'

class Reply extends Component {
  constructor(props) {
    super(props)
    this.refreshView = props.refreshView
    this.state = {
      postID: props.postID,
      errors: {},
      inputTitleFieldValue: '',
      inputPostFieldValue: ''
    }
    this.history = props.history
    this.submitReplyForm = this.submitReplyForm.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.handleInputPostFieldChange = this.handleInputPostFieldChange.bind(this);
    this.handleInputTitleFieldChange = this.handleInputTitleFieldChange.bind(this);
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
  
  submitReplyForm(e) {
    e.preventDefault()
    if (!this.state.inputPostFieldValue || !this.state.inputTitleFieldValue)  {
      return;
    }
    const data = {title: this.state.inputTitleFieldValue, text: this.state.inputPostFieldValue};
    
    this.sendPost(e.target, data);
  }

  sendPost(form, data) {
    const self = this
    /*const errors = this.validate(data)

    console.log('errors', data, errors)

    if ( Object.keys(this.state.errors).length > 0 ) {
      return false
    }*/

    form.reset() // Empty form

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

  hotkeySubmit(e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
      // ctrl + enter was pressed
      const form = e.target.closest('form');
      this.sendPost(form, serialize(form, { hash: true }))
    }
  }

  handleInputTitleFieldChange(e) {
    this.setState({inputTitleFieldValue: e.target.value});
  }

  handleInputPostFieldChange(e) {
    this.setState({inputPostFieldValue: e.target.value});
  }

  render() {
    return (
      <div className="container mt-5">
        <h4 style={styles.heading}>Snapchat your database</h4>
        <form className="form" onSubmit={this.submitReplyForm.bind(this)}>
          { this.state.postID
            ? <input type="hidden" name="id" value={this.state.postID} />
            : <div className="form-group"><label htmlFor="title">Title</label><input onChange={this.handleInputTitleFieldChange} value={this.state.inputTitleFieldValue} type="text" name="title" id="title" className="form-control w-100" style={styles.input} />
            {this.state.errors.title && <div className="alert alert-danger" role="alert">
              {this.state.errors.title}
            </div>}
            </div>
          }
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea onChange={this.handleInputPostFieldChange} value={this.state.inputPostFieldValue} onKeyDown={this.hotkeySubmit.bind(this)} className="form-control w-100" id="text" name="text" style={styles.textarea}></textarea>
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
