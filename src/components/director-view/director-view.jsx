import React from 'react'
import {Card, Button} from 'react-bootstrap'

class DirectorView extends React.Component{
  render() {
    const {director, onBackClick} = this.props
    const {Img, Body, Title, Text} = Card
    const {ImagePath, Name, Description} = director

    return (
      <Card
      className='text-center mt-1'
      style={{ backgroundColor: 'lightgray' }}>
      <Img
        src={ImagePath}
        alt={Name}
        className='w-25 m-auto pt-2'
        crossOrigin='anonymous'
      />
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

export default DirectorView