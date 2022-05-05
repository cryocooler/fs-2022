import React from "react"
const ErrorNotif = ({ message }) => {
    if (!message) {return null}
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  export default ErrorNotif