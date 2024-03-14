import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import "./SearchPage.css";
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        if (debouncedSearchTerm){
            fetchSearchMovie(debouncedSearchTerm);
        }
    },[debouncedSearchTerm]);

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
            );
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error: ",error);
        }
    }
    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <selection className="search-container">
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return(
                            <div className='movie'>
                                <div 
                                    className='movie_column-poster'
                                    onClick={()=> navigate(`/${movie.id}`)}
                                >
                                    <img src={movieImageUrl} alt="" className='movie_poster' />
                                </div>
                            </div>
                        );
                    }
                })}
            </selection>
        // searchResults.length가 0보다 크지않을 때(데이터가 존재하지 않을때) => :로 표시 
        ): (
        <section className='no-results'>
            <div className='no-results_text'>
                <p>
                    Your search for "{debouncedSearchTerm}" did not have any matches.
                </p>
                <p>Suqqestions:</p>
                <ul>
                    <li>Try different keywords</li>
                </ul>
            </div>
        </section>
        )
    } 
    return renderSearchResults();
}
