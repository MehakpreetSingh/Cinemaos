import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const TrailersCard = (props) => {
    const [videos, setVideos] = useState([])
    const { actor } = props;
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${actor.id}/videos?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`)
            .then((res) => {
                const filteredTrailers = res.data.results.filter(video => video.type === 'Trailer');
                console.log(filteredTrailers)
                setVideos(filteredTrailers)
                console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            
            <a
                href={`https://youtube.com/watch?v=${videos[0]?.key}`}
                key={actor.id}
                className="flex-shrink-0 group whitespace-normal flex-col relative  h-full  transition-all duration-500 object-center  flex items-center justify-center"
            >
                <div className='relative group-hover:scale-110 translation-all transition-all duration-300 rounded-2xl '>
                    <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w342${actor.backdrop_path}`}
                        alt={actor.name}
                        effect="blur"
                        className="w-full h-full rounded-2xl object-cover object-center"
                        visibleByDefault={true}
                    />
                <div className="absolute group-hover:scale-125 transition-all duration-300 inset-0 flex justify-center items-center">
                    <span className=" h-20 w-20" style={{
                        background: 'url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg)',
                        filter: 'invert(1)',
                    }}></span>
                </div>
                </div>
                <div className="absolute inset-0" ></div>
                <div className='text-white font-bold text-base h- flex justify-center' style={{ wordWrap: 'break-word' }}>{actor.title || actor.original_name}</div>
                <div className='text-white text-sm'>{videos[0]?.name.substring(0, 50)}</div>
            </a>

        </>
    )
}

export default TrailersCard
