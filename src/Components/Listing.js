// Libraries
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

// Stylesheets
import '../Stylesheets/Listing.css';

function Listing() {

    let token = sessionStorage.getItem('token');

    const [ moviesList, setMoviesList ] = useState([]);
    
    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=75a6c960c8545d65b159b1049dfa7f67&page=1';
        axios
            .get(endPoint)
            .then(res => {
                const apiData = res.data;
                setMoviesList(apiData.results);
            })
            .catch(e => {
                swAlert(<h2 className='swAlert'>Something went wrong...</h2>)
            })
    }, []);

    return(
        <>
            { !token && <Navigate to="/login" />}
            
            <div className='row'>
                {
                    moviesList.map((movie, index) => {
                        return(
                            <div className='col-3' key={index}>
                                <div className="card my-4" >
                                    <div className='img-container'>
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="movie poster" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{ movie.title }</h5>
                                        <p className="card-text">{ movie.overview.substring(0,150) } ...</p>
                                        <Link to={`/detail?movieID=${movie.id}`} className="btn">View more</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Listing;