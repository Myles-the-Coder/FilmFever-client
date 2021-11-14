import React from 'react'
import {Card, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

class DirectorView extends React.Component{
  render() {
    const {director, onBackClick} = this.props
    const {Body, Title, Text} = Card
    const {Name, Bio} = director

    return (
      <Card
      className='text-center mt-1'
      style={{ backgroundColor: 'lightgray' }}>
      <Body>
        <Title>{Name}</Title>
        <Text>{Bio}</Text>
        <Button className='btn' onClick={() => onBackClick()}>
          Back
        </Button>
      </Body>
    </Card>
    )
  }
}

const {string, func, shape} = PropTypes

DirectorView.propTypes = {
  director: shape({
    Name: string.isRequired,
    Bio: string.isRequired,
    BirthDate: string,
    DeathDate: string,
  }).isRequired,
  onBackClick: func.isRequired
}

export default DirectorView