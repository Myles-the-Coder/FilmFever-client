import React from 'react'
import spinner from '../../img/movie-reel.svg'

function MovieReelSpinner() {
  return (
    <div className='text-center m-3'>
      <img src={spinner} alt="Spinner" />
    </div>
  )
}

export default MovieReelSpinner
