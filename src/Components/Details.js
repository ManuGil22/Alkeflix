// Libraries
import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

// Stylesheets
import '../Stylesheets/Details.css';

function Details(){

    const token = sessionStorage.getItem('token');

    const query = new URLSearchParams(window.location.search);
    const movieID = query.get('movieID');

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=75a6c960c8545d65b159b1049dfa7f67`;
        axios
            .get(endPoint)
            .then(res => {
                const apiData = res.data;
                console.log(apiData)
                setMovie(apiData);
            })
            .catch(e => {
                swAlert(<h2 className="swAlert">Oh no! Something went wrong...</h2>)
            })
    }, [movieID]);

    return(
        <>
            { !token && <Navigate to="/login" />}
            { !movie && <h2>Loading...</h2>}
            {  movie && 
                <div className="container movie-detail">
                    <h2 className='my-4 movie-text'>{movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img" alt="movie poster" />
                        </div>
                        <div className='col-8'>
                            <h5>Review:</h5>
                            <p className='fs-5 movie-text'>{movie.overview}</p>
                            <h5>Rating: <span className='fw-normal fs-5 movie-text'>{movie.vote_average}/10 ({movie.vote_count} votes)</span></h5>
                            <div className='d-flex flex-row align-items-center'>
                                <h5 className='m-0'>Genres:</h5>
                                <ul className='d-flex list-unstyled mb-0 fs-5'>
                                {
                                    movie.genres.map((genre, index, movie) => {
                                        if ( index + 1 === movie.length) {
                                            return <li key={genre.id} className="ms-1 movie-text">{genre.name}</li> 
                                        } else {
                                            return <li key={genre.id} className="ms-1 movie-text">{genre.name},</li> 
                                        }
                                    })
                                }
                                </ul>
                            </div>
                            <h5 className='mt-2'>Duration: <span className='fw-normal fs-5 movie-text'>{movie.runtime} minutes</span></h5>
                            <h5 className='mt-2'>Release date: <span className='fw-normal fs-5 movie-text'>{movie.release_date}</span></h5>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Details;