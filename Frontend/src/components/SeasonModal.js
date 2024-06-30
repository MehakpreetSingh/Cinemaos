import { useEffect, useState } from "react"
import React from 'react'
import close from '../close.png'
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { doc, updateDoc, getDoc, } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const SeasonModal = () => {
    const { id, S, E } = useParams()
    const [showData, setShowData] = useState({});
    const [seasonData, setSeasonData] = useState({})
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const handleEpisodeClick = (episode) => {
        setSelectedEpisode(episode);
    };
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [episodeNo, setEpisodeNo] = useState("");
    useEffect(() => {
        const addToContinueWatching = async (movieData1) => {
            try {
                let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
                const userRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userRef);
                const movieData = {
                    backdrop_path: movieData1.backdrop_path,
                    id: movieData1.id,
                    media_type: "tv",
                    title: movieData1.original_name
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
        const getSeasonData = async (req, res) => {
            const url = `https://api.themoviedb.org/3/tv/${id}/season/${S}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setVideoUrl(`https://vidsrc.pro/embed/tv/${id}/${S}/${E}?&amp;theme=00c1db`)
            setSelectedEpisode(data.episodes[E - 1])
            setSeasonData(data);
        }
        const getShowData = async (req, res) => {
            const url = `https://api.themoviedb.org/3/tv/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            addToContinueWatching(data);
            setShowData(data)
        }
        getShowData();
        getSeasonData();
        setLoading(false);
    }, [id, S, E])
    const filteredEpisodes = episodeNo === ''
        ? seasonData?.episodes || [] // Show all if empty
        : seasonData?.episodes?.filter(
            (element) => element.episode_number.toString().includes(episodeNo)
        ) || [];
    return (
        <>
            <div className="fixed w-full h-full "><LazyLoadImage effect="blur" src={`https://image.tmdb.org/t/p/w1280/${seasonData?.poster_path}`} style={{ position: "fixed" }} width="100%" height="100%" className="fixed top-0 left-0 w-full h-full object-cover  blur-3xl !opacity-40" /></div>
            {!loading && <div class="pt-16 lg:pb-16 w-full relative align-left overflow-hidden flex flex-wrap xl:flex-col">
                <div class="w-full max-w-7xl 2xl:max-w-[113rem] line-clamp-1 mx-auto text-gray-300 p-2 sm:p-3 flex justify-between">
                    <div class="!hidden sm:!flex gap-2 w-full"><Link class="hover:underline underline-offset-2 shrink-0 !line-clamp-1" to="/home">Home</Link><span>/</span><Link class="hover:underline capitalize underline-offset-2 shrink-0 !line-clamp-1" to="/tv">show</Link><span>/</span><Link class="text-[#00c1db] hover:underline underline-offset-2 !line-clamp-1" to={`/tv/${showData?.id}`}>{showData?.original_name}</Link></div>
                </div>
                <div class="flex w-full flex-col sm:px-2 2xl:px-4 lg:aspect-[2/1] overflow-hidden lg:flex-row max-w-7xl 2xl:max-w-[113rem] mx-auto">
                    <div class="w-full lg:w-[30%] xl:w-[25%] order-last lg:order-none flex-shrink-0 shadow-md overflow-hidden flex flex-col gap-[.1rem] sm:rounded-l-lg">
                        <div class="flex w-full shrink-0 !h-14 px-3 py-4 items-center overflow-hidden bg-white/5 gap-2">
                            <div class="text-base text-white flex gap-1 items-center">
                                Episodes
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide  lucide-film">
                                    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect>
                                    <line x1="7" x2="7" y1="2" y2="22"></line>
                                    <line x1="17" x2="17" y1="2" y2="22"></line>
                                    <line x1="2" x2="22" y1="12" y2="12"></line>
                                    <line x1="2" x2="7" y1="7" y2="7"></line>
                                    <line x1="2" x2="7" y1="17" y2="17"></line>
                                    <line x1="17" x2="22" y1="17" y2="17"></line>
                                    <line x1="17" x2="22" y1="7" y2="7"></line>
                                </svg>
                            </div>
                            <div class="ml-auto ring-1 ring-white/30 p-1 px-2 w-[5.5rem] flex items-center gap-1 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                                <input type="number" name="epNumber" placeholder="No. of Ep." class="bg-transparent focus:outline-none w-[80%] text-xs text-white" value={episodeNo} onChange={(e) => setEpisodeNo(e.target.value)} />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings">
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <div className="w-full h-[19.9rem] lg:h-auto flex-grow bg-white/5 scroll-p-1 smoothie overflow-y-auto ep-list">
                            {filteredEpisodes?.map((element) => (
                                <Link
                                    to={`/tv/${id}/${S}/${element.episode_number}`}
                                    key={element.episode_number} // Use a unique key for better performance
                                    title={element.name}
                                    onClick={() => handleEpisodeClick(element)}
                                    className={`w-full h-[3.3rem] relative justify-between rounded-sm px-3 py-2 flex items-center gap-1 flex-shrink-0 text-sm line-clamp-2 smoothie ${selectedEpisode?.episode_number === element.episode_number
                                        ? 'text-[#00c1db] font-bold bg-white/20 backdrop-blur-md brightness-105' // Selected style
                                        : 'text-white' // Unselected style
                                        }`}
                                >
                                    <div className="flex gap-2 italic tracking-wide">
                                        <span className="font-medium">{element.episode_number}.</span>
                                        <span className="font-normal line-clamp-1 text-start">
                                            {element.name}
                                        </span>
                                    </div>
                                    <span
                                        className={`p-1 flex items-center justify-center h-fit flex-shrink-0 rounded-full overflow-hidden ${selectedEpisode?.episode_number === element.episode_number
                                            ? 'bg-[#00c1dbe5]' // Show SVG when selected
                                            : 'bg-transparent'  // Hide SVG when unselected
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="11"
                                            height="11"
                                            viewBox="0 0 24 24"
                                            fill="black"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-play"
                                        >
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </span>
                                </Link>
                            ))}
                        </div>

                    </div>
                    <div class="w-full lg:w-[70%] xl:w-[75%] gap-1 flex flex-col shadow-md overflow-hidden lg:rounded-r-lg">
                        <div class="w-full aspect-[16/11] sm:!aspect-video relative bg-white/5 overflow-hidden"><iframe title={id} src={videoUrl} width="100%" allowfullscreen="" height="100%" id="video-player" sandbox= 'allow-forms allow-pointer-lock allow-same-origin allow-downloads allow-top-navigation-by-user-activation allow-storage-access-by-user-activation  allow-top-navigation allow-scripts allow-navigation' referrerpolicy="origin" class="size-full object-contain object-center"></iframe></div>
                        <div class="bg-white/5 flex-grow w-full">
                            <div class="w-full p-2 py-3">
                                <div class="w-full no-scrollbar-atAll relative rounded-xl overflow-hidden ">
                                    <span class="-translate-x-[3rem] flex absolute px-3 justify-center h-full items-center bg-gradient-to-r from-black/80 left-[-1px] z-30 top-1/2 -translate-y-1/2 cursor-pointer hover:text-[var(--Gblue)] hover:from-black overflow-hidden smoothie">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left">
                                            <path d="m12 19-7-7 7-7"></path>
                                            <path d="M19 12H5"></path>
                                        </svg>
                                    </span>
                                    <span class=" flex absolute px-3 justify-center h-full items-center bg-gradient-to-l from-black/80 right-[-1px] z-30 top-1/2 -translate-y-1/2 cursor-pointer hover:text-[var(--Gblue)] hover:from-black overflow-hidden smoothie">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right">
                                            <path d="M5 12h14"></path>
                                            <path d="m12 5 7 7-7 7"></path>
                                        </svg>
                                    </span>
                                    <div class=" hidden sm:flex overflow-x-scroll w-full gap-x-2 no-scrollbar-atAll">
                                        {
                                            showData?.seasons?.map((element, index) => {
                                                return (
                                                    <a title={`season${element.season_number}`} class="shrink-0 group relative w-1/4 2xl:w-1/5 !aspect-[2/1] overflow-hidden rounded-xl cursor-pointer" href={`/tv/${showData?.id}/${element.season_number}/1`}>
                                                        <div class="w-full h-full bg-white/5 rounded-xl shadow-lg overflow-hidden smoothie"><LazyLoadImage effect="blur" alt="" src={`https://image.tmdb.org/t/p/w342/${element.poster_path || seasonData.poster_path}`} width="100%" height="100%" class="w-full h-full object-cover brightness-[.7] group-hover:scale-[1.04] overflow-hidden smoothie" /></div>
                                                        <div class="absolute flex flex-col h-full w-full top-0 left-0 px-2 py-1">
                                                            <div class="absolute top-2 right-2 p-[.4rem] shadow-md shadow-black bg-[#2ccaffd8]  hidden rounded-full overflow-hidden">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
                                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                                </svg>
                                                            </div>
                                                            <span class="!line-clamp-1 sm:!line-clamp-2 !capitalize inline-block !italic text-sm tracking-wide bg-black/60 rounded-md px-2 md:py-1 w-fit !leading-tight font-normal text-white">{`${element.name}`}</span>
                                                            <div class="line-clamp-1 self-end mt-auto bg-black/60 rounded-md px-2 md:py-1 tracking-wider !italic font-light text-xs text-white">Ep.24</div>
                                                        </div>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {
                !loading && <div class="w-full max-w-7xl 2xl:max-w-[113rem] px-2 2xl:px-4 mx-auto">
                    <div class="w-full max-w-7xl 2xl:max-w-[113rem] gap-5 lg:gap-7 flex flex-col md:flex-row mx-auto my-5 md:my-8">
                        <div class="hidden md:block w-[20%] flex-shrink-0 select-none h-fit rounded-lg shadow-md overflow-hidden aspect-[1/1.5] bg-white/10">

                            <LazyLoadImage effect="blur" src={`https://image.tmdb.org/t/p/w500/${showData?.poster_path}`} width="100%" class="w-full object-cover aspect-[1/1.5]" />

                        </div>
                        <div class="flex w-full lg:w-[70%] md:w-[80%] flex-col gap-2">
                            <span class="text-[22px] lg:text-3xl mb-1 line-clamp-3 w-full font-semibold tracking-wide text-white !leading-tight">{showData?.original_name}</span>
                            <div class="flex flex-shrink-0 gap-2 mb-1 flex-wrap items-center">{showData?.genres?.map((element) => { return (<a key={element.id} class="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium  bg-[#00c1db33] rounded-md text-[#00c1db]" href="/explore?type=movie&amp;genre=878">{element.name}</a>) })}</div>
                            <div class="mb-1 p-2 bg-white/10 rounded-lg leading-snug"><span class="text-white/70 font-light !line-clamp-4 text-pretty text-sm lg:text-sm">{showData?.overview}</span></div>
                            <div class="flex flex-col flex-wrap gap-[.6rem] lg:gap-[.4rem] tracking-wide">
                                <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Date: <span class="font-light tracking-wider">{showData?.first_air_date}</span></div>
                                <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Rating: <span class="font-light">{showData?.vote_average?.toFixed(1)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !loading && <div class="flex sm:hidden w-full sm:px-2 2xl:px-4">
                    <div class="w-full bg-white/5 sm:rounded-lg px-2">
                        <div class="!flex items-center !gap-2 p-1">
                            <span class="text-lg tracking-wide sm:text-xl text-white font-medium">Seasons</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-open">
                                <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </div>
                        <div class="flex overflow-x-scroll gap-x-2 w-full pl-1 p-2 no-scrollbar-atAll">
                            {
                                showData?.seasons?.map((element, index) => {
                                    return (
                                        <a title={`season${element.season_number}`} class="shrink-0 group relative w-1/2 2xl:w-1/5 !aspect-[2/1] overflow-hidden rounded-xl cursor-pointer" href={`/tv/${showData?.id}/${element.season_number}/1`}>
                                            <div class="w-full h-full bg-white/5 rounded-xl shadow-lg overflow-hidden smoothie"><LazyLoadImage effect="blur" alt="" src={`https://image.tmdb.org/t/p/w342/${element.poster_path || seasonData.poster_path}`} width="100%" height="100%" class="w-full h-full object-cover brightness-[.7] group-hover:scale-[1.04] overflow-hidden smoothie" /></div>
                                            <div class="absolute flex flex-col h-full w-full top-0 left-0 px-2 py-1">
                                                <div class="absolute top-2 right-2 p-[.4rem] shadow-md shadow-black bg-[#2ccaffd8]  hidden rounded-full overflow-hidden">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
                                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                    </svg>
                                                </div>
                                                <span class="!line-clamp-1 sm:!line-clamp-2 !capitalize inline-block !italic text-sm tracking-wide bg-black/60 rounded-md px-2 md:py-1 w-fit !leading-tight font-normal text-white">{`${element.name}`}</span>
                                                <div class="line-clamp-1 self-end mt-auto bg-black/60 rounded-md px-2 md:py-1 tracking-wider !italic font-light text-xs text-white">Ep.24</div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {/* {!loading&& 
                <div class="w-full max-w-7xl 2xl:max-w-[113rem] px-2 2xl:px-4 mx-auto">
                <div class="w-[90%] max-w-7xl 2xl:max-w-[113rem] gap-5 lg:gap-7 flex flex-col md:flex-row mx-auto my-5 md:my-8">
                   <div class="hidden md:block w-[20%] flex-shrink-0 select-none h-fit rounded-lg shadow-md overflow-hidden aspect-[1/1.5] bg-white/10"><span class=" lazy-load-image-background blur lazy-load-image-loaded" ><img src={`https://image.tmdb.org/t/p/w780/${showData?.poster_path}`} width="100%" class="w-full object-cover aspect-[1/1.5]"/></span></div>
                   <div class="flex w-full lg:w-[70%] md:w-[80%] flex-col gap-2">
                      <span class="text-[22px] lg:text-3xl mb-1 line-clamp-3 w-full text-white font-semibold tracking-wide !leading-tight">{showData?.original_name}</span>
                      <div class="flex flex-shrink-0 gap-2 mb-1 flex-wrap items-center"><a class="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium  bg-[#00c1db33] rounded-md text-[#00c1db]" href="/explore?type=tv&amp;genre=35">Comedy</a></div>
                      <div class="mb-1 p-2 bg-white/10 rounded-lg leading-snug"><span class="text-white/70 font-light !line-clamp-4 text-pretty text-sm lg:text-sm">Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.</span></div>
                      <div class="flex flex-col flex-wrap gap-[.6rem] lg:gap-[.4rem] tracking-wide">
                         <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Date: <span class="font-light tracking-wider">1994/09/22</span></div>
                         <div class="text-xs line-clamp-1 text-white lg:text-sm font-medium">Rating: <span class="font-light">8.4</span></div>
                         <div class="text-xs lg:text-sm text-white font-light"><span class="font-medium ">Cast: </span>n/a</div>
                      </div>
                   </div>
                </div>
             </div>
            } */}
            {/* <div className='p-1.5 d:p-12  bg-transparent'>
            
            <div className='rounded-xl relative border shadow-sm bg-white'>
            <div onClick={()=>props.handleModalClick(props.modalindex)} className="cursor-pointer absolute top-4 right-4">
                <LazyLoadImage src={close} alt="" />
            </div>
                <div className='rounded-xl border px-4  bg-white flex flex-col md:flex-row items-center '>
                        <LazyLoadImage className="absolute opacity-40 h-full w-full object-cover -z-10 top-0 bottom-0 left-0 right-0" src={`https://image.tmdb.org/t/p/original${props.backdrop_path}`} alt="" />
                    <div className='m-10 '>
                        <LazyLoadImage effect="blur" className='h-52 rounded-md object-cover' src={`https://image.tmdb.org/t/p/original${props.element.poster_path}`} alt="" />
                    </div>
                    <div className='content my-12 w-full md:w-2/3'>
                        <h1 className='text-black text-3xl font-bold'>{`${props.element.name}`}<span className='font-medium'>{`(${props.element.air_date?.substring(0, 4)})`}</span></h1>
                        <div className='flex items-center space-x-10'>
                            <p>{props.element.air_date}</p>
                            <p>{props.element.episode_count} Episodes</p>
                        </div>
                        <h1 className='textblack text-xl font-medium'>Overview</h1>
                        <p>{props.element.overview}</p>
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <h1 className='my-1 mx-10 text-xl font-medium'>Episodes <span className='font-normal'>{props.element.episode_count}</span> </h1>
                    <div className=' grid grid-cols-1 gap-4'>
                        {seasonData?.episodes?.map((element, index) => {
                            
                                return (

                                    <div className="" key={index}>
                                        <a href={`https://vidsrc.pro/embed/tv/${props.id}/${element.season_number}/${element.episode_number}`} className="mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row w-[95%] hover:bg-gray-100 ">
                                           
                                            <img className="object-cover mx-2 w-auto h-40 rounded-t-lg md:h-auto md:w-[30%] md:rounded-none md:rounded-l-lg" src={`https://image.tmdb.org/t/p/original${element.still_path}`} alt="" />
                                            
                                                                                           
                                            <div className="flex flex-col justify-between  p-4 leading-normal">
                                                <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 "><span>{element.episode_number}.</span>{element?.name}</h5>
                                                <p className="mb-3 text-sm md:text-lg font-normal text-gray-700 dark:text-gray-600">{element?.overview}</p>
                                            </div>
                                        </a>
                                    </div>
                                )

                        })}
                    </div>
                </div>
            </div>
        </div> */}
        </>
    )
}

export default SeasonModal