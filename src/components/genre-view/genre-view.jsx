import React from 'react'
import {Card, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

class GenreView extends React.Component{
  render() {
    const {genre, onBackClick} = this.props
    const {Body, Title, Text} = Card
    const {Name, Description} = genre

    return (
      <Card
      className='text-center mt-1'
      style={{ backgroundColor: 'lightgray' }}>
      <Body>
        <Title>{Name}</Title>
        <Text>{Description}</Text>
        <Button className='btn' onClick={() => onBackClick()}>
          Back
        </Button>
      </Body>
    </Card>
    )
  }
}

export default GenreView