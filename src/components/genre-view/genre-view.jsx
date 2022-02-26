import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../../styles/_button.scss'

const GenreView = ({movies}) => {
  const params = useParams()
  const navigate = useNavigate()
  const genre = movies.find(
    movie => movie.Genre.Name === params.Name
  ).Genre
    const {Body, Title, Text} = Card

    return (
      <Card
      className='text-center mt-1'
      style={{ backgroundColor: 'whitesmoke' }}>
      <Body>
        <Title>{genre.Name}</Title>
        <Text>{genre.Description}</Text>
        <Button bsPrefix='card-button' onClick={() => navigate(-1)}>
          Back
        </Button>
      </Body>
    </Card>
    )
}

export default GenreView