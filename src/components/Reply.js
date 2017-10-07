import React from 'react'

const Reply = (props) => {
  return (
    <div className="container mt-5">
      <h4 style={styles.heading}>Snapchat your database</h4>
      <form>
        <textarea style={styles.textarea}></textarea><br />
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
    width: '100%',
    maxWidth: '500px',
    height: '150px'
  }
}

export default Reply
