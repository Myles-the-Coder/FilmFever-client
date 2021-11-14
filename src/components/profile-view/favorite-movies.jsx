import React from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const FavoriteMovies = ({favoriteMoviesList, removeFromFavorites}) => {
  return (
    <>
    <Row className='justify-content-center text-center'>
    <h1>Favorite Movies</h1>
    {favoriteMoviesList.map(movie => {
      const {_id, Title, ImagePath} = movie
      return (
        <Col xs={10} md={4}  key={_id}>
          <Card className='p-3 text-center m-1 justify-content-center' style={{backgroundColor: 'lightgray'}}>
          <h4>{Title}</h4>
          <img src={ImagePath} alt={Title} crossOrigin='anonymous'/>
          <Link to={`/movies/${_id}`}>
            <Button className='m-1'>See Details</Button>
          </Link>
          <Button onClick={() => removeFromFavorites(_id)}>Remove from Favorites</Button>
          </Card>
          </Col>
      )
    })}
    </Row>
    </>
  )
}

export default FavoriteMovies