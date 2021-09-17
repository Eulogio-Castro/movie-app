import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoveList from './Components/MovieList';
import Header from './Components/Header';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import staticMovies from './StaticMovieList.json'
import SearchBar from './Components/SearchBar';
import AddFavorite from './Components/AddFavorite';
import './App.css';
import RemoveFavorite from './Components/RemoveFavorite';

const HeaderRow = styled(Row)`
  align-items: center;
  width: fit-content;
`;

const MovieRowWrapper = styled(Row)`
  overflow-x: auto;
  flex-wrap: nowrap;
`;


const API_KEY = `aab7b9c8`;
const API_APPEND = `&apikey=${API_KEY}`;
const LOCAL_STORAGE_KEY = 'react-movie-app-favorites';


function App() {
  const [movies, setMovies] = useState(staticMovies);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {

    const searchURL = `https://www.omdbapi.com/?s=${searchValue}${API_APPEND}`;
    const response = await fetch(searchURL);
    const responseJSON = await response.json()


    console.log(responseJSON);
    if(responseJSON.Search){

      setMovies(responseJSON.Search);
    }
    

  };
  

  useEffect(() => {
    getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() => {
      const movieFavorites = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      setFavorites(movieFavorites);
    }, []);


    const saveToLocalStorage = (items) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    };

    const addFavoriteMovie = (movie) => {
      if(favorites){
        const newFavoriteList = [...favorites, movie];
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
      }

      else{
        const newFavoriteList = [movie];
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
      }
      
    };

    const removeFavoriteMovie = (movie) =>{
      const newFavoriteList = favorites.filter(
        (favorite) => favorite.imdbID !== movie.imdbID);
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
          <MoveList movies = {movies} 
          favoriteComponent = {AddFavorite}
          handleFavoritesClick ={addFavoriteMovie}
          />
        </MovieRowWrapper>

        <HeaderRow>
          <Header heading = "Favorites"></Header>
        </HeaderRow>
        <MovieRowWrapper>
          <MoveList movies = {favorites} 
          favoriteComponent = {RemoveFavorite}
          handleFavoritesClick ={removeFavoriteMovie}/>
        </MovieRowWrapper>
        
      </div>
  );
}

export default App;
