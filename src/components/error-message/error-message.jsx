import React from 'react'

function ErrorMessage({message}) {
  const errorStyling = {
      color: '#cc3300',
      backgroundColor: 'whitesmoke',
      borderRadius:'5px',
      padding: '10px',
      margin: '10px',
      textAlign: 'center',
      fontSize: '1.2rem'
  }
  return <h1 style={errorStyling}>{message}</h1>
}

export default ErrorMessage
