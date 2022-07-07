// Libraries
import React from "react";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

// Images
import GenericPoster from '../GenericPoster.jpg';

function Results(){

    let keyword = useLocation();
    keyword = keyword.search.slice(9, keyword.search.length);
    const [ moviesResult, setMoviesResult ] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=75a6c960c8545d65b159b1049dfa7f67&query=${keyword}`;
        axios
            .get(endPoint)
            .then(res => {
                const movies = res.data.results;
                if (movies.length === 0) {
                    swAlert(<h2>Nothing found</h2>)
                }
                setMoviesResult(movies);
            })
            .catch(e => {
                swAlert(<h2>Oh no!! Something went wrong!</h2>)
            });
    }, [keyword]);

    return(
        <>
            <h2 className="results-header">Searching: <em className="results-keyword">{keyword}</em> </h2>
            { moviesResult.length === 0 && <h3>0 Results</h3>}
            <div className='row'>
                {
                    moviesResult.map((movie, index) => {
                        return(
                            <div className='col-3' key={index}>
                                <div className="card my-4" >
                                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `${GenericPoster}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{ movie.title }</h5>
                                        <p className="card-text">{ movie.overview.substring(0,150) } ...</p>
                                        <Link to={`/detail?movieID=${movie.id}`} className="btn btn-primary">View more</Link>
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

export default Results;
