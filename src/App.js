import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './Components/MovieList';
import Header from './Components/Header';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import staticMovies from './StaticMovieList.json'
import SearchBar from './Components/SearchBar';
import AddFavorite from './Components/AddFavorite';
import './App.css';
import RemoveFavorite from './Components/RemoveFavorite';
import { render } from '@testing-library/react';

const HeaderRow = styled(Row)`
  align-items: center;
  width: fit-content;
`;

const MovieRowWrapper = styled(Row)`
  overflow-x: auto;
  flex-wrap: nowrap;
  max-height: 400px;
  overflow-y: hidden;
`;


const API_KEY = `&apikey=aec16d47eeda7d5002c6079fdf3c13dd`;
const API_APPEND = `https://api.themoviedb.org/3/search/movie?`;
const HEADERS = {"Authorization" : "Bearer aec16d47eeda7d5002c6079fdf3c13dd","Content-Type": "application/json;charset=utf-8"}
const LOCAL_STORAGE_KEY = 'react-movie-app-favorites';


function App() {
  const [movies, setMovies] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {

    const searchURL = `
    https://api.themoviedb.org/3/search/movie?api_key=aec16d47eeda7d5002c6079fdf3c13dd&language=en-US&query=${searchValue}&page=1&include_adult=false`;
    const response = await fetch(searchURL);
    const responseJSON = await response.json()

    console.log(responseJSON);
    if(responseJSON.results){
      setMovies(responseJSON.results);
    }
    

  };

  useEffect(() => {
    getMovieRequest(searchValue);
    }, [searchValue]);

  useEffect(() => {
      const movieFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      setFavorites(movieFavorites);
    }, []);


    const saveToLocalStorage = (items) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    };

    const addFavoriteMovie = (movie) => {

      if(favorites){
        if(favorites.includes(movie))
        {
          setFavorites(favorites);
        }
        else{
          const newFavoriteList = [...favorites, movie];
          setFavorites(newFavoriteList);
          saveToLocalStorage(newFavoriteList);
        }
      }

      else{
        const newFavoriteList = [movie];
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
      }
      
    };

    const removeFavoriteMovie = (movie) =>{
      const newFavoriteList = favorites.filter( (favorite) => favorite.imdbID !== movie.imdbID);
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
    };

    
  return (
        <div className = 'container-fluid movie-app'>
          <HeaderRow>
            <Header heading = "Movies"></Header>
            <SearchBar searchValue = {searchValue} setSearchValue ={setSearchValue}/>
          </HeaderRow>
          <MovieRowWrapper>
            <MovieList 
            movies = {movies} 
            favoriteComponent = {AddFavorite}
            handleFavoritesClick ={addFavoriteMovie}
            />
          </MovieRowWrapper>

          <HeaderRow>
            <Header heading = "Favorites"></Header>
          </HeaderRow>
          <MovieRowWrapper>
            <MovieList movies = {favorites} 
            favoriteComponent = {RemoveFavorite}
            handleFavoritesClick ={removeFavoriteMovie}/>
          </MovieRowWrapper>
          
        </div>
    );
  
  
}

export default App;
