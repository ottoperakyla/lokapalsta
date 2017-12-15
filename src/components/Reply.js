import React, { Component } from 'react'
import { createPost } from '../api'

class Reply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputTitleFieldValue: '',
      inputPostFieldValue: ''
    }

    this.submitReplyForm = this.submitReplyForm.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.handleInputPostFieldChange = this.handleInputPostFieldChange.bind(this);
    this.handleInputTitleFieldChange = this.handleInputTitleFieldChange.bind(this);
  }
  
  submitReplyForm(e) {
    e.preventDefault()
    this.sendPost();
  }

  sendPost() {
    if (this.props.postID) {
      if (!this.state.inputPostFieldValue) {
        return;
      }
    }
    else if (!this.props.postID) {
      if (!this.state.inputPostFieldValue || !this.state.inputTitleFieldValue) {
         return;
       }
    }

    const data = {
      title: this.state.inputTitleFieldValue, 
      text: this.state.inputPostFieldValue,
      id: this.props.postID
    };

    createPost(data).then((response) => {
      if (typeof data.id === 'undefined') {
        // This is not a reply but a new post. Go to post.
        this.props.history.push('/posts/' + response.data.id)
      }
      else {
        // This is a reply. Update data
        this.props.refreshView()
      }
    })
  }

  hotkeySubmit(e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
      // ctrl + enter was pressed
      this.sendPost();
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
          {!this.props.postID && (
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input 
                onChange={this.handleInputTitleFieldChange} 
                value={this.state.inputTitleFieldValue} 
                type="text" 
                className="form-control w-100" 
                style={styles.input} 
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea 
              onChange={this.handleInputPostFieldChange} 
              value={this.state.inputPostFieldValue} 
              onKeyDown={this.hotkeySubmit.bind(this)} 
              className="form-control w-100" 
              style={styles.textarea}>
            </textarea>
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
};

export default Reply;
