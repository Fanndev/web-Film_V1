import './App.css';
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react'

const App = () => {

  const imageURL = process.env.REACT_APP_BASEIMGURL

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
      getMovieList().then((results) => {
        setPopularMovies(results)
      })
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
            <div className='Movie-wrapper' key={i}>
              <div className='Movie-Title'> {movie.title} </div>
                <img
                className="Movie-image"
                src={`${imageURL}${movie.poster_path}`}
                alt='Images'
                />
                <div className='Movie-date'>{movie.release_date}</div>
                  <div className='Movie-rate'>{movie.vote_average}</div>
            </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
    const query = await searchMovie(q)
    setPopularMovies(query.results)
    }
    
  }

  console.log({ popularMovies : popularMovies })

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Movie apps Fandev._</h1>
        <input 
        placeholder='Cari Film anda...' 
        className='Movie-search' 
        onChange={({ target }) => search(target.value)}
        />
          <div className='Movie-container'>
            <PopularMovieList />
          </div>
      </header>
    </div>
  );
}

export default App;
