import React from 'react'
import {Card, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

import '../../styles/_button.scss'

class GenreView extends React.Component{
  render() {
    const {genre, onBackClick} = this.props
    const {Body, Title, Text} = Card
    const {Name, Description} = genre

    return (
      <Card
      className='text-center mt-1'
      style={{ backgroundColor: 'whitesmoke' }}>
      <Body>
        <Title>{Name}</Title>
        <Text>{Description}</Text>
        <Button bsPrefix='card-button' onClick={() => onBackClick()}>
          Back
        </Button>
      </Body>
    </Card>
    )
  }
}

export default GenreView