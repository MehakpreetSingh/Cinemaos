import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const MovieCard2 = (props) => {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getMovieData = async () => {
            const url = `https://api.themoviedb.org/3/movie/${props.movieData.tmdb_id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setInfo(data);
        }
        getMovieData();
        setLoading(false) ;
    }, [])

    return (
        <div>
            {!loading && <div className=" py-6 flex flex-col justify-center sm:py-12">

                <div className="py-3 sm:max-w-xl sm:mx-auto">
                    <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
                        <Link to={`/movie/${props.movieData.tmdb_id}`} className="h-48 overflow-visible w-1/2 hover:scale-[1.1] transition-transform duration-150">
                            <img className="rounded-3xl shadow-lg" src={`https://image.tmdb.org/t/p/original${info?.poster_path}`} alt=""/>
                        </Link>
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

                    </div>
                </div>

            </div>}
        </div>
    )
}

export default MovieCard2