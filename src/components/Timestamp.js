import React, { Component } from 'react'

class Timestamp extends Component {
  constructor(props) {
    super(props)
    this.timestamp = props.timestamp
  }

  formatTimestamp(timestamp) {
    if (typeof timestamp !== 'string') {
      return ''
    }
    // Timestamp is in format 20.10.17 17:58
    
    // Separate date and time components
    var [ date, month, year, hours, minutes ] = timestamp.split(/[.:\s]/g)

    // Create new UTC date with this information
    var d = new Date(Date.UTC(
      2000 + parseInt(year, 10),  // Year
      parseInt(month, 10) - 1,    // Month
      date,                       // Date
      hours,                      // Hours
      minutes,                    // Minutes
      0                           // Seconds
    ))

    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + ' ' +
           d.getHours() + ':' + d.getMinutes()
  }

  render() {
    return (
      <small>@{this.formatTimestamp(this.timestamp)}</small>
    )
  }
}

export default Timestamp
