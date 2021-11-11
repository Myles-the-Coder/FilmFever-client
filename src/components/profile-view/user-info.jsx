import React from 'react'
import Card from 'react-bootstrap'

const UserInfo = ({user, email, birthday}) => {
  return (
    <>
    <p>Username: {`${user}`}</p>
    <p>Email: {`${email}`}</p>
    <p>Birthday: {`${birthday}`}</p>
    </>
  )
}

export default UserInfo