import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';

const WatchTv = () => {
    const [dbData, setDbData] = useState({});
    const [loading, setLoading] = useState(true);
    const [episodeData, setEpisodeData] = useState({});
    const { id, S, E } = useParams();
    useEffect(() => {
        const host =  `https://cinemaos-backend.herokuapp.com/` ;
        const getEpisodeAPIData = async () => {
            const url = `https://api.themoviedb.org/3/tv/${id}/season/${S}/episode/${E}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`
            const response = await fetch(url);
            const data = await response.json();
            setEpisodeData(data);
        }
        const getEpisodeData = async () => {
            const url = `${host}tvshows/getepisode/${id}/${S}/${E}`;
            const response = await fetch(url, {
                method: "GET",
                header: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();

            if (data.success) {
                setDbData(data.getpost);
            }
            else {

            }
            setLoading(false);
        }
        getEpisodeAPIData();
        getEpisodeData();
    }, [])
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='hidden md:inline-block'>
                <div class="max-w-sm bg-white border-t border-l border-b ">
                    <a href="#">
                        <img class="" src={`https://image.tmdb.org/t/p/original${episodeData?.still_path}`} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{episodeData?.name}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 h-[52px] overflow-hidden">{episodeData?.overview}</p>
                    </div>
                </div>
            </div>
            <ReactPlayer url={`${dbData.url}`} controls={true} />
        </div>
    )
}

export default WatchTv