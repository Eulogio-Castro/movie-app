import { render } from "@testing-library/react";
import React, { Component } from "react";
import styled from "styled-components";
import MovieDetails from "./MovieDetails";

const PosterWrapper = styled.div`
    width: fit-content;
    position: relative;
    padding-top: 25px;
    padding-bottom: 25px;
    color: white;
    max-height: 400px;
`;

const Poster = styled.img`
    width: 250px;
    height: 350px;
    transition: transform 0.2s;
    ${PosterWrapper}:hover & {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const PosterTitle = styled.p`
    font-size: larger;
    max-height: 100px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
`;

const PosterYear = styled.p`
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
`;

const PosterOverview = styled.p`
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: middle;
    top: 0;
    max-height: 175px;
    overflow-y: scroll;
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

        if(props.movies){

            return (
                <> 
                    {
                        props.movies.map((movie) => (
                        <PosterWrapper className='image-container d-flex'>
                            <Poster src = {`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt = "Poster"></Poster>
                            <PosterInfoOverlay> 
                                <PosterTitle>{movie.original_title}</PosterTitle>
                                <PosterYear>({movie.release_date})</PosterYear>
                                <PosterOverview>{movie.overview}</PosterOverview>

                            </PosterInfoOverlay>
                            <PosterFavoriteOverlay 
                            onClick = {() =>props.handleFavoritesClick(movie)}
                            >
                                <FavoriteComponent />
                            </PosterFavoriteOverlay>
                        </PosterWrapper>
                        ))
                    }
                </>

            );

        }
        else{
            return(null);
        }

        
};
   

export default MovieList;