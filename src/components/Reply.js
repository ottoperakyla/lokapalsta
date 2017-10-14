import React from 'react'

const Reply = (props) => {
  return (
    <div className="container mt-5">
      <h4 style={styles.heading}>Snapchat your database</h4>
      <form>
        { props.match.params.id
          ? <input type="hidden" name="id" value={props.match.params.id} />
          : <input type="text" name="title" className="w-100" style={styles.input} />
        }
        <textarea className="w-100" style={styles.textarea}></textarea><br />
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
