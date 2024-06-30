import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc,  } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const WatchMovie = () => {
    const [movieData, setMovieData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const addToContinueWatching = async (movieData1) => {
            try {
                let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
                const userRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userRef);
                const movieData = {
                    backdrop_path:movieData1.backdrop_path,
                    id:movieData1.id,
                    media_type:"movie",
                    title:movieData1.title
                }
                var progress = 0;
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    let continueWatching = userData.continueWatching || [];

                    // Check if continueWatching is an array (defensive programming)
                    if (!Array.isArray(continueWatching)) {
                        continueWatching = []; // Reset to empty array if it's not an array
                    }

                    const existingIndex = continueWatching.findIndex(
                        (movie) => movie.id === movieData.id
                    );

                    if (existingIndex >= 0) {
                        // Update existing movie data (including progress and timestamp)
                        continueWatching[existingIndex] = {
                            ...movieData,
                            progress,
                            timestamp: new Date(),
                        };
                    } else {
                        // Add new movie data (with initial progress and timestamp)
                        continueWatching.push({
                            ...movieData,
                            progress,
                            timestamp: new Date(),
                        });
                    }

                    await updateDoc(userRef, { continueWatching });
                    console.log("Movie added to Continue Watching");
                } else {
                    console.error("No user document found for this user ID:", user.uid);
                    // Handle the case where the user document doesn't exist yet
                }

            } catch (error) {
                console.error('Error adding to continue watching: ', error);
            }
        };
        // const host = `https://cinemaos-backend.onrender.com/`;
        // const dbData = async () => {
        //     const url = `${host}movies/getmovie/${id}`;
        //     const response = await fetch(url, {
        //         method: "GET",
        //         header: {
        //             'Content-Type': 'application/json'
        //         },
        //     });
        //     const data = await response.json();
        //     setDbinfo(data);
        // }
        // dbData();

        const getMovieData = async (req, res) => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            addToContinueWatching(data);
            setMovieData(data)
        }
        getMovieData();

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
            {/* !loading &&
                <div className='w-screen h-screen flex justify-center items-center '>

                    <div class="w-full md:m-64 lg:w-[70%] xl:w-[75%] gap-1 flex flex-col shadow-md overflow-hidden lg:rounded-r-lg">
                        <div class="w-full aspect-[16/11] sm:!aspect-video relative bg-white/5 overflow-hidden"><iframe src={`https://vidsrc.pro/embed/movie/${id}?&amp;theme=00c1db`} width="100%" allowfullscreen="" height="100%" id="video-player" referrerpolicy="origin" class="size-full object-contain object-center"></iframe></div>
                        <div class="bg-white/5 flex-grow w-full"></div>
                    </div>
                    
                    {/* <a className='px-4 py-2 m-4 bg-amber-500 text-white rounded-lg' href={`${dbinfo?.url}`} download>Download</a> */}
            {/* <div className='w-[75%] mt-10'>
                    {MyPlyrVideo(dbinfo?.url)}
                    <Plyr {...plyrProps} /> */}
            {/* </div> */}
            {/* </div> */}
            {
                !loading &&
                <div class="min-h-screen overflow-auto">
                    <div class="fixed top-0 left-0 blur-3xl h-screen w-full bg-white/5"><span class=" lazy-load-image-background blur lazy-load-image-loaded" ><LazyLoadImage effect="blur" src={`https://image.tmdb.org/t/p/w1280/${movieData?.backdrop_path}`} width="100%" height="100%" class="w-full h-full object-cover !opacity-40" /></span></div>
                    <div>
                        <div class="pt-16 lg:pb-8 xl:pb-14 w-full relative align-left overflow-hidden flex flex-wrap xl:flex-col">
                            <div class="w-full max-w-7xl mx-auto text-gray-300 p-2 sm:p-3 flex justify-between">
                                <div class="!hidden sm:!flex gap-2 w-full"><a class="hover:underline underline-offset-2 !line-clamp-1" href="/home">Home</a><span>/</span><a class="hover:underline capitalize underline-offset-2 !line-clamp-1" href={`/movie`}>movie</a><span>/</span><a class="text-[#00c1db] hover:underline underline-offset-2 !line-clamp-1 shrink-0" href={`/movie/${movieData?.id}`}>{movieData?.title}</a></div>
                            </div>
                            <div class="flex flex-col lg:flex-row w-full sm:px-2 flex-wrap">
                                <div class="w-full max-w-7xl xl:rounded-lg relative aspect-[16/11] sm:!aspect-video bg-white/5 mx-auto shadow-xl overflow-hidden"><iframe src={`https://vidsrc.pro/embed/movie/${id}?&amp;theme=00c1db`} width="100%" allowfullscreen="" height="100%" id="video-player" referrerpolicy="origin"
                                sandbox= 'allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation  allow-top-navigation allow-scripts allow-navigation'
                                 class="size-full object-contain object-center" __idm_id__="7979012"></iframe></div>
                            </div>
                        </div>
                        <div class="w-full max-w-7xl mx-auto px-2 sm:px-3">
                            <div class="w-full max-w-7xl 2xl:max-w-[113rem] gap-5 lg:gap-7 flex flex-col md:flex-row mx-auto my-5 md:my-8">
                                <div class="hidden md:block w-[20%] flex-shrink-0 select-none h-fit rounded-lg shadow-md overflow-hidden aspect-[1/1.5] bg-white/10"><span class=" lazy-load-image-background blur lazy-load-image-loaded" ><LazyLoadImage src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`} width="100%" class="w-full object-cover aspect-[1/1.5]" /></span></div>
                                <div class="flex w-full lg:w-[70%] md:w-[80%] flex-col gap-2">
                                    <span class="text-[22px] lg:text-3xl mb-1 text-white line-clamp-3 w-full font-semibold tracking-wide !leading-tight">{movieData?.title}</span>
                                    <div class="flex flex-shrink-0 gap-2 mb-1 flex-wrap items-center">{movieData?.genres.map((element) => { return (<a key={element.id} class="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium  bg-[#00c1db33] rounded-md text-[#00c1db]" href="/explore?type=movie&amp;genre=878">{element.name}</a>) })}</div>
                                    <div class="mb-1 p-2 bg-white/10 rounded-lg leading-snug"><span class="text-white/70 font-light !line-clamp-4 text-pretty text-sm lg:text-sm">{movieData?.overview}</span></div>
                                    <div class="flex flex-col flex-wrap gap-[.6rem] lg:gap-[.4rem] tracking-wide">
                                        <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Date: <span class="font-light tracking-wider">{movieData?.release_date}</span></div>
                                        <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Rating: <span class="font-light">{movieData?.vote_average.toFixed(1)}</span></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="w-[95%] bg-white/10 h-[1px] mt-10 mx-auto max-w-7xl"></div>
                        <div class="w-full max-w-7xl mx-auto px-2 2xl:px-1">
                            <div class="w-full flex flex-col gap-2 my-8 mx-auto">
                                <div class="text-xl md:text-2xl px-1 font-medium">You may also Like</div>
                                <div class="flex flex-wrap w-full">
                                    <a class="relative flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/4 lg:w-1/6 rounded-lg flex-shrink-0" href="/info/movie/786892">
                                        <div class="w-full relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] smoothie">
                                            <span class=" lazy-load-image-background blur lazy-load-image-loaded" ><img width="100%" height="100%" src="https://image.tmdb.org/t/p/w342/iADOJ8Zymht2JPMoy3R7xceZprc.jpg" class="w-full h-full object-cover object-center group-hover:scale-[1.04] smoothie" /></span>
                                            <div class="absolute top-1 right-0 gap-1 bg-[#00000098] py-1 px-[5px] rounded-l-md flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="gold" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                <span class="!text-xs font-light">7.7 </span>
                                            </div>
                                            <div class="absolute opacity-0 xl:group-hover:opacity-100 flex top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 smoothie">
                                                <span class=" p-[.6rem] hover:brightness-90 bg-[#00c1db] rounded-full flex items-center justify-center smoothie">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="#000000d5" stroke="#000000d5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
                                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                                                <div class="flex md:items-center justify-center gap-1 flex-wrasp text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide "><span>2024</span>•<span class="whitespace-nowrap"><span class="uppercase">en</span></span>•<span>HD</span></div>
                                                <div class="line-clamp-2 text-center text-sm xl:text-base font-medium !leading-tight tracking-wider">Furiosa: A Mad Max Saga</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            }
        </>
    )
}

export default WatchMovie