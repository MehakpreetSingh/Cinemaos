import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const TrailersCard = (props) => {
    const [videos, setVideos] = useState([])
    const { actor } = props;
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${actor.id}/videos?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`)
            .then((res) => {
                const filteredTrailers = res.data.results.filter(video => video.type === 'Trailer');
                setVideos(filteredTrailers)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [actor.id])
    return (
        <>
            <div key={actor.id} class="card" style={{ '--background-image': `url(${`https://image.tmdb.org/t/p/w780${actor.backdrop_path}`})` }}>
                <div class="content" >
                    <h2 class="title">{actor.title || actor.original_name}</h2>
                    <p class="copy">{videos[0]?.name.substring(0, 28)}</p>
                    <a href={`https://www.youtube.com/watch?v=${videos[0]?.key}`} class="btn">Play</a>
                </div>
            </div>
        </>
    )
}

export default TrailersCard
