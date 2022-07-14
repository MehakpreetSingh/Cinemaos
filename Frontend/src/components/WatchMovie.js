import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
import ComingSoon from './ComingSoon';

const WatchMovie = () => {
    const [dbinfo, setDbinfo] = useState({});
    const [loading ,setLoading] = useState(true) ;
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
    setTimeout(() => {
        setLoading(false) ;
    }, 800);
    }, [id])
    return (
        <>
    {!loading && 
        <div className='h-screen flex justify-center items-center'>
            {
            <ReactPlayer url={`${dbinfo?.url}`} controls={true} />
            }
            
            
        </div>}
        </>
    )
}

export default WatchMovie