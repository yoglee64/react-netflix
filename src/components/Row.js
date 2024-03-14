import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css";

import axios from '../api/axios';
import './Row.css'
import MovieModal from './MovieModal/index.js'

const Row = ({ title, fetchUrl, isLargeRow, id}) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    useEffect(()=>{
        fetchMovieData();
    },[fetchUrl])

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    }
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelection(movie);
    }
    return (
        <selection className="row">
            {/* title */}
            <h2>{title}</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                loop={ true } // 무한로딩
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    1378: {
                        slidesPerView:6, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 6 // 몇개씩 슬라이드 할지
                    },
                    998: {
                        slidesPerView:5, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 5 // 몇개씩 슬라이드 할지
                    },
                    625: {
                        slidesPerView: 4, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 4 // 몇개씩 슬라이드 할지
                    },
                    0: {
                        slidesPerView: 3, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 3 // 몇개씩 슬라이드 할지
                    }
                }}
            >
                <div className='row_posters' id={id}>
                    {/* several row_poster */}
                    {movies.map((movie) =>(
                        <SwiperSlide>
                            <img 
                                key={movie.id}
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                loading='lazy'
                                alt={movie.name}
                                onClick={()=>handleClick(movie)}
                            />  
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
                {modalOpen && (
                    <MovieModal
                        {...movieSelected}
                        setModalOpen = {setModalOpen}
                    />
                )}
        </selection>
    )
}
export default Row