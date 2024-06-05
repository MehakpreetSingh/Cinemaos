import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieCard2 = (props) => {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // const getMovieData = async () => {
        //     const url = `https://api.themoviedb.org/3/movie/${props.movieData.id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     setInfo(data);
        // }
        // getMovieData();
        setInfo(props.movieData)
        setTimeout(() => {
            setLoading(false);
        }, 30);
    }, [])

    return (
        <>
            {!loading && 
                <Link class="relative flex p-[.5rem] mb-2 flex-col group gap-2 w-full rounded-lg flex-shrink-0" to={`/movie/${props.movieData.id}`}>
                <div class="w-full relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] transition-all duration-300 ease-in">
                    <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w342/${props.movieData?.poster_path}`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform ease-in duration-300"
                        effect="blur"
                    />
                   <div class="absolute top-1 right-0 gap-1 bg-[#00000098] py-1 px-[5px] rounded-l-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="gold" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">
                         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span class="!text-xs text-white font-light">{props.movieData.vote_average.toFixed(1)} </span>
                   </div>
                   <div class="absolute opacity-0 xl:group-hover:opacity-100 flex top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 smoothie">
                      <span class=" p-[.6rem] hover:brightness-90 bg-[#00c1db] rounded-full flex items-center justify-center smoothie">
                         <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="#000000d5" stroke="#000000d5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                         </svg>
                      </span>
                   </div>
                   <div class="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                      <div class="flex md:items-center justify-center gap-1 flex-wrasp text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide "><span>{props.movieData.release_date.substring(0,4)}</span>•<span class="whitespace-nowrap"><span class="uppercase">MOVIE</span></span>•<span>HD</span></div>
                      <div class="line-clamp-2 text-center text-white text-sm font-medium !leading-tight ">{props.movieData.title}</div>
                   </div>
                </div>
             </Link>
            }
        </>
    )
}

export default MovieCard2