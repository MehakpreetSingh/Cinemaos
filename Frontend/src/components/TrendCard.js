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
        setTimeout(() => {
            setLoading(false);
        }, 50);

    }, [])

    return (
        <div>
            {!loading && <div className=" flex flex-col relative transition-all duration-500 justify-center items-center">

                <div className="py-3 transition-all duration-500 sm:max-w-sm sm:mx-auto">
                    <Link to={(props.movieData.media_type === "movie") ?
                        `/movie/${props.movieData.id}` : `/tv/${props.movieData.id}`
                    } className="h-48 relative overflow-visible w-1/2 hover:scale-[1.1] transition-transform duration-150">
                        <LazyLoadImage effect='blur' alt="image" className="rounded-3xl block bg-transparent w-full transition-all h-full duration-500 shadow-lg" src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`} />
                    
                    </Link>

                    {/* <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
                        <div className="flex flex-col w-1/2 space-y-4">
                            <div className="flex justify-between items-start">
                                <Link to={`/movie/${props.movieData.tmdb_id}`} className="text-3xl font-bold  hover:text-yellow-600">{info?.original_title}</Link>
                                <div className="bg-yellow-400 font-bold rounded-xl p-2">{info?.vote_average}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Movie</div>
                                <div className="text-sm text-gray-800">{info?.release_date}</div>
                            </div>
                            <p className=" text-gray-400 max-h-40 overflow-y-hidden">{info?.overview}</p>

                        </div>
                    </div> */}

                </div>
                <h1 className="bg-blue-700 text-white transition-all duration-500 text-sm absolute bottom-0 left-4 font-bold rounded-full inline-block p-2">{props.movieData?.vote_average.toFixed(1)}</h1>

            </div>}
        </div>
    )
}

export default TrendCard