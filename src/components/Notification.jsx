import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
const Notification = () => {
  const { message, type } = useSelector(({ notification }) => {
    return notification
  })

  if (!message) {
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