import React from 'react';
import axios from 'axios';
import TrailersCard from './TrailersCard'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TrailersBlock = () => {
    const [selectedOption, setSelectedOption] = useState('popular');
    const [trailers, setTrailers] = useState([]);
    const [nowplayingtrailers, setNowplayingTrailers] = useState([]);
    const [latesttrailers, setlatestTrailers] = useState([]);
    const [upcomingtrailers, setUpcomingTrailers] = useState([]);
    const latestMovies = "https://api.themoviedb.org/3/movie/top_rated?api_key=748d8f1491929887f482d9767de12ea8&language=en-US";
    const nowplaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=748d8f1491929887f482d9767de12ea8&language=en-US";
    const upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=748d8f1491929887f482d9767de12ea8&language=en-US";

    useEffect(() => {
        axios.get(latestMovies)
            .then((res) => {
                setTrailers(res.data.results);
                setlatestTrailers(res.data.results)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(nowplaying)
            .then((res) => {
                
                setNowplayingTrailers(res.data.results)
            }).catch((err) => {
                console.log(err)
            })
        axios.get(upcoming)
            .then((res) => {
                setUpcomingTrailers(res.data.results)
            }).catch((err) => {
                console.log(err)
            })

    }, [trailers, setTrailers]);
    // Function to handle option change
    const handleOptionChange = (type) => {
        setSelectedOption(type);
    };
    const gettrailers = () => {
        if (selectedOption === 'popular') {
            return latesttrailers;
        } else if (selectedOption === 'now_playing') {
            return nowplayingtrailers;
        } else if (selectedOption === 'upcoming') {
            return upcomingtrailers;
        }
    }

    return (
        <div className='flex flex-col bg-white/10 backdrop-blur-md w-full transition-all ease-in duration-500 px-4 pt-6 mt-4 h-[350px] md:px-16 justify-center overflow-hidden '>
            <div className='flex justify-end items-center space-x-6 w-full '>
                <h1 className='text-2xl w-full flex text-white font-bold'>Latest Trailers</h1>
                <div className='focus:outline-none outline-none rounded-xl text-white bg-transparent backdrop-blur-md  border border-gray-300 shadow-md space-x-2 transition-all duration-300 hidden sm:flex flex-row'>
                    <button onClick={() => handleOptionChange("popular")}  className={selectedOption !== 'popular' ? `py-1 px-4 rounded-xl w-max hover:bg-white/90 hover:text-black transition-all cursor-pointer duration-300` : `py-1 px-4 w-max cursor-pointer rounded-xl hover:bg-white/90 bg-white/90 text-black hover:text-black transition-all duration-300`} value='popular'>Top Rated</button>
                    <button onClick={() => handleOptionChange("now_playing")} className={selectedOption !== 'now_playing' ? `py-1 px-4 rounded-xl w-max hover:bg-white/90 hover:text-black transition-all cursor-pointer duration-300` : `py-1 px-4 w-max cursor-pointer rounded-xl hover:bg-white/90 bg-white/90 text-black hover:text-black transition-all duration-300`} value='now_playing'>Now Playing</button>
                    <button onClick={() => handleOptionChange("upcoming")} className={selectedOption !== 'upcoming' ? `py-1 px-4 rounded-xl w-max hover:bg-white/90 hover:text-black transition-all cursor-pointer duration-300` : `py-1 px-4 w-max cursor-pointer rounded-xl hover:bg-white/90 bg-white/90 text-black hover:text-black transition-all duration-300`} value='upcoming'>Upcoming</button>
                </div>
                <div className="w-full sm:hidden max-w-xs mx-auto">
                <select
                    className="focus:outline-none outline-none rounded-md bg-white/70 backdrop-blur-md px-2 py-1 border border-gray-300 shadow-md hover:bg-white/90 transition-all duration-300"
                    value={selectedOption}
                    onChange={(event)=>handleOptionChange(event.target.value)}
                >
                    <option onChange={() => handleOptionChange("popular")} className="text-xs" value="popular">Top Rated</option>
                    <option onChange={() => handleOptionChange("now_playing")} className="text-xs" value="now_playing">Now Playing</option>
                    <option onChange={() => handleOptionChange("upcoming")} className="text-xs" value="upcoming">Upcoming</option>
                </select>
            </div>
            </div>
            
            <div
                className="flex gap-3 py-5 overflow-x-auto w-[95vx] "
                style={{
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "none",
                    scrollbarColor: "rgb(255 255 255 / 0.5) transparent",
                    scrollbarWidth: "thin",
                    msScrollbarArrowColor: "transparent",
                    scrollBehavior: "smooth",
                    msScrollLimitXMin: '10',
                }}
            >
                {gettrailers()?.map(
                    (actor) =>
                        actor.id && (
                            <TrailersCard  key={actor.id} actor={actor} />
                        )
                )}
            </div>
        </div>
    );
};
export default TrailersBlock;
