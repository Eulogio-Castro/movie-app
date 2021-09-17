import React from "react";
import styled from "styled-components";
import MovieDetails from "./MovieDetails";

const PosterWrapper = styled.div`
    width: fit-content;
    position: relative;
    padding-top: 25px;
    padding-bottom: 25px;
    color: white;
`;

const Poster = styled.img`
    transition: transform 0.2s;
    ${PosterWrapper}:hover & {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const PosterTitle = styled.p`
    font-size: 30px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
`;

const PosterYear = styled.p`
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
`;


const PosterInfoOverlay = styled.div`
    position: absolute;
    background:  rgba(0,0,0,.8);
    width: 100%;
    transition: 0.5s ease;
    opacity: 0;
    top: 5px;
    font-size: 20px;
    height: 100%;
    text-align:center;
    left: 0;

    ${PosterWrapper}:hover & {
        opacity: 1;
    }
`;

const PosterFavoriteOverlay = styled.div`
    position: absolute;
    background:  rgba(100,0,0,1);
    width: 100%;
    transition: 0.5s ease;
    opacity: 0;
    bottom: 0;
    font-size: 20px;
    padding: 20px;
    text-align:center;
    left: 0;

    ${PosterWrapper}:hover & {
        opacity: 1;
    }
`;




const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    
    return (
        <> 
        {props.movies.map((movie) => (
            
            


            <PosterWrapper className='image-container d-flex'>
                <Poster src = {movie.Poster} alt = "Poster"></Poster>
                <PosterInfoOverlay> 
                    <PosterTitle>{movie.Title}</PosterTitle>
                    <PosterYear>({movie.Year})</PosterYear>
                    <MovieDetails movie = {movie}></MovieDetails>

                </PosterInfoOverlay>
                <PosterFavoriteOverlay 
                onClick = {() =>props.handleFavoritesClick(movie)}
                >
                    <FavoriteComponent />
                </PosterFavoriteOverlay>
            </PosterWrapper>
        ))};
    </>

    );
    
};

export default MovieList;