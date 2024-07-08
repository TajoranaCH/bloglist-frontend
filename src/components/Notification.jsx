import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type='message' }) => {
  if (message === null) {
    return null
  }

  return (type === 'error') ? (
    <div className="error">
      {message}
    </div>
  ) : <div className="message">
  {message}
</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification