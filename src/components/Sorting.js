import React from 'react'

const Sorting = (props) => {
  return (
    <label onChange={props.toggle} htmlFor="new-only">Show new only
      <input name="new-only" id="new-only" type="checkbox"/>
    </label>
  )
}

export default Sorting
