import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const TrendCard = (props) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // const getMovieData = async () => {
        //     const url = `https://api.themoviedb.org/3/movie/${props.movieData.tmdb_id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     setInfo(data);
        // }
        // getMovieData();
        console.log(props.movieData);
        setTimeout(() => {
            setLoading(false);
        }, 50);

    }, [])

    return (
        <>
            {!loading && (
                <Link to={props.movieData.media_type === 'movie'
                    ? `/movie/${props.movieData.id}`
                    : `/tv/${props.movieData.id}`}
                    className="group relative w-full flex-1 overflow-hidden rounded-2xl bg-black transition-all">
                    <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-black transition-all">
                        <LazyLoadImage
                            className="w-full h-full object-cover"
                            src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`}
                            alt=""
                            effect="blur"
                            wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: {height: "100%"  ,transition: "transform 0.3s ease-in" ,},
                            }}
                            visibleByDefault={true}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                            <div>
                                <div className="flex flex-col justify-between items-start">
                                    <h1 className="text-white w-[100%] text-[13px] font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                        {props.movieData.title || props.movieData.original_name}
                                    </h1>
                                    <div className='flex flex-row justify-between w-full items-center'>
                                        <div className="flex items-center text-[10px] w-full my-1 space-x-1">
                                            <span className="text-yellow-400 text-xs">★</span>
                                            <span className="text-white font-bold">{props?.movieData.vote_average.toFixed(1)}</span>
                                            <span className="text-white font-bold">|</span>
                                            <span className="text-white font-bold">HD</span>
                                            <span className="text-white font-bold">•</span>
                                            <span className="text-white font-bold">{props?.movieData.media_type === "movie" ? "Movie" : "TV"}</span>
                                        </div>
                                        <div className="text-gray-100 text-[10px]">
                                            {props.movieData.release_date?.substring(0, 4) || props.movieData.first_air_date?.substring(0, 4)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-rows-[0fr] transition-all group-hover:grid-rows-[1fr]">
                                    <p className="overflow-hidden text-white/70 opacity-0 transition duration-500 group-hover:opacity-100 text-white text-sm text-[10px]">
                                        {props.movieData.overview.substring(0, 200) + "..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            )}

        </>
    )
}

export default TrendCard