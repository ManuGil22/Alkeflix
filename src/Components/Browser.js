// Libraries
import React from "react";
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

// Stylesheets
import '../Stylesheets/Browser.css'

function Browser() {

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            swAlert(<h5>You need to enter a keyword</h5>);
        } else if (keyword.length < 4){
            swAlert(<h5>Keyword must be at least 4 characters length</h5>);
        } else {
            e.currentTarget.keyword.value = '';
            navigate(`/results?keyword=${keyword}`);
        }
    }

    return(
        <form className="browser-form ms-auto me-4" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="keyword" />
            <button className="btn-outline-success text-light btn" type="submit">Search</button>
        </form>
    )
}

export default Browser;
