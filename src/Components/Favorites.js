// Libraries
import React from 'react';
import { Link, Navigate } from 'react-router-dom';

// Stylesheets
import '../Stylesheets/Favorites.css';

// Icons
import { AiFillHeart } from 'react-icons/ai';

function Favorites ({ addOrRemoveFavs, favorites }) {

    let token = sessionStorage.getItem('token');

    return(
        <>
            { !token && <Navigate to="/" /> }

            <h2 className='fav-amount'>{favorites.length ? favorites.length : 'No' } favorite movies</h2>
            <div className='row'>
                {
                    favorites.map((movie, index) => {
                        return(
                            <div className='col-3' key={index}>
                                <div className="card my-4" >
                                    <img src={movie.imgURL} className="card-img-top" alt="movie poster" />
                                    <button className='favourite-btn' onClick={addOrRemoveFavs} data-movie-id={movie.id}><AiFillHeart className='fav-icon' fill='red' /></button> 
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

export default Favorites;
