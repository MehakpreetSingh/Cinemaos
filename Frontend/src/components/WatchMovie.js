import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';

const WatchMovie = () => {
    const [dbinfo, setDbinfo] = useState({});
    const { id} = useParams();
    useEffect(() => {
        
    const host = `https://cinemaos-backend.herokuapp.com/`;
    const dbData = async () => {
        const url = `${host}movies/getmovie/${id}`;
        const response = await fetch(url, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        setDbinfo(data);
    }
    dbData() ;
    }, [])
    return (
        <div className='h-screen flex justify-center items-center'>
            <ReactPlayer url={`${dbinfo.url}`} controls={true} />
        </div>
    )
}

export default WatchMovie