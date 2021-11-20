import React from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import FilterInput from '../filter-input/filter-input'
import NoMoviesFound from '../no-movies-found/no-movies-found'

const FavoriteMovies = ({favoriteMovies, removeFromFavorites}) => {
  let filteredFavs = favoriteMovies;
  const filter = useSelector((state) => state.filter.value)

	if (filter !== '') {
		filteredFavs = favoriteMovies.filter(movie =>
			movie.Title.toLowerCase().includes(filter.toLowerCase())
		);
	}

  return (
    <>
    <Row className='justify-content-center text-center'>
    <h1 className='p-2 m-4 text-light'>Your Favorite Movies</h1>
    <Col md={12} className='m-2'>
    {filteredFavs.length > 0 ? <FilterInput filter={filter}/> : <div></div>}
    </Col>
    {filteredFavs.length > 0 ? filteredFavs.map(movie => {
      const {_id, Title, ImagePath} = movie
      return (
        <Col xs={9} sm={6} md={4} key={_id}>
          <Card className='p-3 text-center m-1' style={{backgroundColor: 'lightgray'}}>
          <h4>{Title}</h4>
          <img src={ImagePath} alt={Title} crossOrigin='anonymous'/>
          <Link to={`/movies/${_id}`}>
            <Button className='m-1'>See Details</Button>
          </Link>
          <Button onClick={() => removeFromFavorites(_id)} className='w-75 m-auto'>Remove from Favorites</Button>
          </Card>
          </Col>
      )
    }) : <NoMoviesFound message={'Movie not found in favorites'}/>}
    </Row>
    </>
  )
}

export default FavoriteMovies