import React from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import FilterInput from '../filter-input/filter-input'
import NoMoviesFound from '../no-movies-found/no-movies-found'

const FavoriteMovies = ({favoriteMoviesList, removeFromFavorites}) => {
  let filteredFavs = favoriteMoviesList;
  const filter = useSelector((state) => state.filter.value)

	if (filter !== '') {
		filteredFavs = favoriteMoviesList.filter(movie =>
			movie.Title.toLowerCase().includes(filter.toLowerCase())
		);
	}

  return (
    <>
    <Row className='justify-content-center text-center'>
    <h1>Favorite Movies</h1>
    <Col md={12} className='m-2'>
    <FilterInput filter={filter}/>
    </Col>
    {filteredFavs.length > 0 ? filteredFavs.map(movie => {
      const {_id, Title, ImagePath} = movie
      return (
        <Col xs={10} md={4} key={_id}>
          <Card className='p-3 text-center m-1' style={{backgroundColor: 'lightgray'}}>
          <h4>{Title}</h4>
          <img src={ImagePath} alt={Title} crossOrigin='anonymous'/>
          <Link to={`/movies/${_id}`}>
            <Button className='m-1'>See Details</Button>
          </Link>
          <Button onClick={() => removeFromFavorites(_id)}>Remove from Favorites</Button>
          </Card>
          </Col>
      )
    }) : <NoMoviesFound message={'Movie not found in favorites'}/>}
    </Row>
    </>
  )
}

export default FavoriteMovies