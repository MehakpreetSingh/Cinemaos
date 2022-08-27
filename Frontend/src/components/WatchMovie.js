import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';


const WatchMovie = () => {
    const [dbinfo, setDbinfo] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

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
        dbData();
        var x = document.getElementById("loading-bar");
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                x.classList.remove(`w-[${(i) * 25}%]`);
                x.classList.add(`w-[${(i + 1) * 25}%]`);
            }, 300);
        }
        x.classList.remove("w-[100%]");

        setTimeout(() => {
            setLoading(false);
        }, 1150);
        setTimeout(() => {
            x.classList.add("w-0")
        }, 1200);
    }, [])
    // const plyrProps = {
    //     source: undefined, // https://github.com/sampotts/plyr#the-source-setter
    //     options: {
    //         enabled: true,
    //         controls: [
    //             'play-large', // The large play button in the center
    //              // Restart playback
    //             'rewind', // Rewind by the seek time (default 10 seconds)
    //             'play', // Play/pause playback
    //             'fast-forward', // Fast forward by the seek time (default 10 seconds)
    //             'progress', // The progress bar and scrubber for playback and buffering
    //             'current-time', // The current time of playback
    //             'duration', // The full duration of the media
    //             'mute', // Toggle mute
    //             'volume', // Volume control
    //             'captions', // Toggle captions
    //             'settings', // Settings menu
    //             'pip', // Picture-in-picture (currently Safari only)
    //             'airplay', // Airplay (currently Safari only)
    //             'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
    //             'fullscreen', // Toggle fullscreen
    //         ],
    //         settings: [
    //             'captions', 'quality', 'speed', 'loop'
    //         ],
    //         quality: {
    //             default: 576,
    //             // The options to display in the UI, if available for the source media
    //             options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    //             forced: false,
    //             onChange: null,
    //           },
           
    //     }, // https://github.com/sampotts/plyr#options
    //     // Direct props for inner video tag (mdn.io/video)
    // }
    // function MyPlyrVideo(url) {
    //     if(dbinfo !== null) {
    //         plyrProps.source = {
    //             type: 'video',
    //             sources: [
    //                 {
    //                     src: `${dbinfo?.url}`,
    //                     type: 'video/mp4',
    //                 },]
    //         };
    //     }else {
    //         plyrProps.source = {
    //             type: 'video',
    //             sources: [
    //                 {
    //                     src: "https://cdn.plyr.io/static/blank.mp4",
    //                     type: 'video/mp4',
    //                 },]
    //         };
    //     }
    // }
    return (
        <>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {!loading &&
                <div className='h-screen flex justify-center items-center '>
                    
                    <ReactPlayer  url={`${dbinfo?.url}`} controls={true} />
                
                    {/* <a className='px-4 py-2 m-4 bg-amber-500 text-white rounded-lg' href={`${dbinfo?.url}`} download>Download</a> */}
                    {/* <div className='w-[75%] mt-10'>
                    {MyPlyrVideo(dbinfo?.url)}
                    <Plyr {...plyrProps} /> */}
                    {/* </div> */}



                </div>}
        </>
    )
}

export default WatchMovie