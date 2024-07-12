import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc,  } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import Spinner from './Spinner';

const WatchMovie = () => {
    const [movieData, setMovieData] = useState(null);
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

        const getMovieData = async (req, res) => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
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
    }, [id])
    
    return (
        <div className='relative h-screen'>
            <div className='h-[2px] w-full z-[99999999] absolute top-[63px]'>
                <div id="loading-bar" className='transition-all w-[0%] h-[2px] bg-red-800'>
                </div>
            </div>
            {loading && (movieData===null) && <div className='w-full h-full flex justify-center items-center '>
                <Spinner/>
                </div>}
            {
                !loading && movieData && 
                <div class="min-h-screen overflow-auto">

                    <div class="fixed top-0 left-0 blur-3xl h-screen w-full bg-white/5"><span class=" lazy-load-image-background blur lazy-load-image-loaded" ><LazyLoadImage effect="blur" src={`https://image.tmdb.org/t/p/w1280/${movieData?.backdrop_path}`} width="100%" height="100%" class="w-full h-full object-cover !opacity-40" /></span></div>
                    <div>
                        <div class="pt-16 lg:pb-8 xl:pb-14 w-full relative align-left overflow-hidden flex flex-wrap xl:flex-col">
                            <div class="w-full max-w-7xl mx-auto text-gray-300 p-2 sm:p-3 flex justify-between">
                                <div class="!hidden sm:!flex gap-2 w-full"><a class="hover:underline underline-offset-2 !line-clamp-1" href="/home">Home</a><span>/</span><a class="hover:underline capitalize underline-offset-2 !line-clamp-1" href={`/movie`}>movie</a><span>/</span><a class="text-[#00c1db] hover:underline underline-offset-2 !line-clamp-1 shrink-0" href={`/movie/${movieData?.id}`}>{movieData?.title}</a></div>
                            </div>
                            <div class="flex flex-col lg:flex-row w-full sm:px-2 flex-wrap">
                                <div class="w-full max-w-7xl xl:rounded-lg relative aspect-[16/11] sm:!aspect-video bg-white/5 mx-auto shadow-xl overflow-hidden"><iframe title={`movie-${id}`} src={`https://vidsrc.pro/embed/movie/${id}?&amp;theme=00c1db`} width="100%" allowfullscreen="" height="100%" id="video-player" referrerpolicy="origin"
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
                    </div>
                </div>
            }
        </div>
    )
}

export default WatchMovie