import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';


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
    var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            }, 100);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 350);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 400);
    }, [])
    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
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