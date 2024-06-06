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
  
  export default Notification