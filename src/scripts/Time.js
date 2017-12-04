import React from 'react'

const Time = () => (
  <div className="timeInfo">
    <p>{new Date().toLocaleTimeString()}</p>
  </div>
)
export default Time