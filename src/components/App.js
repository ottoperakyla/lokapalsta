import React from 'react'
import { APP_NAME } from '../constants'

const App = (props) => {
  return (
    <div className="container mt-5">
      <h2 style={styles.heading}>{APP_NAME}</h2>
    </div>
  )
}

const styles = {
  heading: {
    color: 'hotpink'
  }
}

export default App
