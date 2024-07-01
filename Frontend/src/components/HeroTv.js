import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import play from "../play.png";
import SeasonModal from "./SeasonModal";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Mousewheel,
  Keyboard,
} from "swiper";
import { FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { doc, updateDoc, getDoc,  } from 'firebase/firestore';
import { db } from '../Firebase/firebase';


const HeroTv = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(null)
  const { id } = useParams();
  // const port = process.env.PORT || 5000 ;
  // const host =  `http://localhost:${port}/` ;
  // const dbData = async() => {
  //     const url = `${host}movies/getmovie/${id}` ;
  //     const response = await fetch(url , {
  //         method : "GET" ,
  //         header : {
  //             'Content-Type': 'application/json'
  //         },
  //     });
  //     const data = await response.json();
  //     setDbinfo(data);
  // }
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const CheckWishlist = async (movieData1) => {
      try {
        let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
        if (!user || !user.uid) {
          console.error("User is not logged in or user ID not found.");
          return; // or handle the login/signup flow
        }

        const userRef = doc(db, "users", user.uid);

        // Fetch the user's document to get the current wishlist data
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          let wishlist = userData.wishlist || [];
  
          if (!Array.isArray(wishlist)) {
            wishlist = [];
          }
  
          const existingIndex = wishlist.findIndex(
            (movie) => movie.id === movieData1.id
          );
  
          if (existingIndex !== -1) {
            // Movie already in the wishlist - Do nothing or update the timestamp
            setIsWishlisted(true);
          } else {
            // Add new movie data
            setIsWishlisted(false);
          }
        } else {
          console.error("No user document found for this user ID:", user.uid);
          // Handle the case where the user document doesn't exist yet
        }
      } catch {

      }
    }
    const getMovieData = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setInfo(data);
      CheckWishlist(data);
      const url2 = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
    
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setCast(data2.cast);
      const url3 = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&page=1'`
      const response3 = await fetch(url3);
      const data3 = await response3.json();
      
      setSimilarMovies(data3.results);
    };
    getMovieData();
    // dbData() ;
    
    var x = document.getElementById("loading-bar");
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        x.classList.remove(`w-[${i * 25}%]`);
        x.classList.add(`w-[${(i + 1) * 25}%]`);
      }, 100);
    }
    x.classList.remove("w-[100%]");

    setTimeout(() => {
      setLoading(false);
    }, 350);
    setTimeout(() => {
      x.classList.add("w-0");
    }, 400);
    // eslint-disable-next-line
  }, []);
  const addToWishlist = async (movieData1) => {
    try {
      let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID not found.");
        return; // or handle the login/signup flow
      }

      const userRef = doc(db, "users", user.uid);

      // Fetch the user's document to get the current wishlist data
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        let wishlist = userData.wishlist || [];

        if (!Array.isArray(wishlist)) {
          wishlist = [];
        }

        const existingIndex = wishlist.findIndex(
          (movie) => movie.id === movieData1.id
        );

        const movieData = {
          backdrop_path: movieData1.backdrop_path,
          id: movieData1.id,
          media_type: "tv",
          title: movieData1.original_name,
          timestamp: new Date(),
        };

        if (existingIndex !== -1) {
          // Movie already in the wishlist - Do nothing or update the timestamp
          setIsWishlisted(false);
          wishlist.splice(existingIndex, 1);
        } else {
          // Add new movie data
          setIsWishlisted(true);
          wishlist.push(movieData);
        }

        await updateDoc(userRef, { wishlist });
      } else {
        console.error("No user document found for this user ID:", user.uid);
        // Handle the case where the user document doesn't exist yet
      }

    } catch (error) {
      console.error('Error adding to continue watching: ', error);
    }
  };

  const handleModalClick = (n) => {
    var x = document.getElementsByClassName("seasonmodalClick")[n];
    if (open) {
      x.classList.add("hidden");
      setOpen(!open);
    } else {
      x.classList.remove("hidden");
      setOpen(!open);
    }
  };
  return (
    <div
      className="relative h-screen"
      
    >
      <div className="h-[2px] w-full z-[99999999] absolute">
        <div
          id="loading-bar"
          className="transition-all w-[0%] h-[2px] bg-red-800"
        ></div>
      </div>
      {!loading && (
        <div className="relative flex flex-col gap-9 md:gap-16 h-screen  ">
          <div className="fixed bottom-0 left-0 w-full h-screen">
            <span
              className="lazy-load-image-background opacity lazy-load-image-loaded"
              style={{
                color: "transparent",
                display: "inline-block",
                height: "100%",
                width: "100%",
              }}
            >
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
                width="100%"
                height="100%"
                className="w-full h-full object-cover blur opacity-60 xl:opacity-50"
                alt="Background"
                effect="blur"
              />
            </span>
            <div
              className="absolute bottom-0 left-0 right-0 w-full h-full "
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0, 0.5) 0%, rgba(0, 0, 0, 0.7411764706) 100%)",
              }}
            ></div>
          </div>
          <div className="flex relative flex-col items-center justify-center gap-10 md:gap-3">
            <div className="INFO mt-[75px] md:mt-[100px] gap-5 py-8 w-full px-4 max-w-7xl mx-auto flex flex-col md:flex-row">
              <div className="flex-shrink-0 mx-auto md:mx-10 w-[180px] md:w-[30%] md:max-w-[275px] overflow-hidden">
                <div className="rounded-lg md:rounded-xl overflow-hidden aspect-[1/1.5] flex-shrink-0 backdrop-blur bg-white/5">
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w780${info.poster_path}`}
                    alt=""
                    effect="blur"
                    className="w-full h-full object-cover lazy-load-image-loaded"
                  />
                </div>
              </div>
              <div className="RIGHT mt-10 w-[80%] md:px-4 md:pb-4 m-auto md:w-[60%] tracking-wide">
                <div className="w-full mx-auto md:w-full flex flex-col gap-7 tracking-wide">
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="text-xl sm:text-2xl lg:text-3xl text-white uppercase line-clamp-3 leading-tight pb-1 text-center md:text-start font-bold">
                      {info.name || info.original_name}
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="text-slate-300 text-sm tracking-wider">
                        {info.first_air_date}
                      </div>
                      <div className="gap-1 bg-[#00c1db17] py-1 px-2 rounded-md flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="gold"
                          stroke="gold"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="!text-xs text-white font-medium">
                          {info?.vote_average?.toFixed(1)}
                        </span>
                      </div>
                      <span className="uppercase !text-sm text-slate-200">
                        {info?.original_language}
                      </span>
                    </div>
                  </div>
                  <div className="-my-[12px] flex flex-shrink-0 gap-2 flex-wrap justify-center md:justify-start items-center">
                    {info.genres?.map((genre) => (
                      <a
                        key={genre.id}
                        to={`/explore?type=tv&genre=${genre.id}`}
                        className="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium bg-[#00c1db33] rounded-md text-[#00c1db]"
                      >
                        {genre.name}
                      </a>
                    ))}
                  </div>
                  <div className="order-3 md:order-none text-[#D4D4D8] text-sm lg:text-base font-normal md:!leading-tight tracking-wider">
                    <div>
                      <span className="italic smoothie">{info.overview}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full">
                    <a
                      className="ring-white gap-2 min-w-fit text-sm md:text-base p-2 font-semibold rounded-md overflow-hidden bg-white/80 text-black justify-center hover:brightness-[.8] items-center flex w-1/2 md:w-[10rem] whitespace-nowrap"
                      href={`/tv/${info?.id}/1/1`} // Update the link for watching
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="black"
                        stroke="currentColor"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-play"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>{" "}
                      Play Now
                    </a>
                    <div
                      className="ring-white hover:cursor-pointer gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 p-2 rounded-md overflow-hidden hover:bg-white/10 justify-center items-center flex w-1/2 md:px-5 md:w-[12rem] !whitespace-nowrap"
                      onClick={()=>addToWishlist(info)}
                    >
                      {(isWishlisted!=null) && !isWishlisted && <span class="gap-1 flex text-white justify-center items-center smoothie !duration-500 origin-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="transparent"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-heart"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        Add To List
                      </span>}
                      {(isWishlisted!=null) && isWishlisted &&
                        <span class="gap-1 text-white flex justify-center items-center smoothie !duration-500 origin-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                          </svg>
                          Added
                        </span>
                      }
                    </div>
                  </div>
                  {/* Cast (with scrolling and lazy loading) */}
                  <div
                    className="flex gap-3 mt-4 overflow-x-auto no-scrollbar"
                    style={{
                      overflowX: "auto",
                      WebkitOverflowScrolling: "touch",
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    {cast?.slice(0, 7).map(
                      (actor) =>
                        actor.profile_path && (
                          <span
                            key={actor.id}
                            className="flex-shrink-0 rounded-full w-16 h-16 md:w-20 md:h-20 object-center bg-white/5 overflow-hidden flex items-center justify-center"
                          >
                            <LazyLoadImage
                              src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                              alt={actor.name}
                              effect="blur"
                              className="w-full h-full object-cover  object-center"
                            />
                          </span>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full z-10 max-w-7xl mx-auto bg-white/10 rounded-lg pt-2 pb-3">
            <div className="flex z-10 flex-col gap-2 px-2 sm:px-3">
              <div className="text-lg md:text-xl text-white font-medium mt-1 ps-2">
                List of Seasons
              </div>
              <div className="flex flex-wrap w-full aspect-[2/1] sm:aspect-[3/1] lg:aspect-[4/1] overflow-hidden overflow-y-auto" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
                {info?.seasons?.map((element, index) => {
                  return (
                    <Link
                      key={index}
                      onClick={() => handleModalClick(index)}
                      className="w-1/2 sm:w-1/3 lg:w-1/4 h-fit group relative !aspect-[2/1] p-1 sm:p-2 cursor-pointer"
                      to={`/tv/${info.id}/${element.season_number}/1`}
                    >
                      <div className="w-full h-full bg-white/10 group-hover:ring-2 ring-white/40 rounded-lg shadow-xl overflow-hidden smoothie ">
                        <span
                          className="text-transparent h-full w-full lazy-load-image-background blur lazy-load-image-loaded flex items-center justify-center"
                        >
                          <LazyLoadImage
                            src={`https://image.tmdb.org/t/p/w342${element.poster_path || info.poster_path}`}
                            alt={element.name}
                            effect="blur"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.04] brightness-75 smoothie"
                          />
                        </span>
                      </div>
                      <div className="absolute flex flex-col h-full w-full top-0 left-0 px-3 py-2 sm:py-3 sm:px-4">
                        <div className="!line-clamp-2 bg-white/20 backdrop-blur-sm !capitalize rounded-md px-2 w-fit !italic text-sm sm:text-base text-white font-medium">
                          {element.name}
                        </div>
                        <div className="line-clamp-1 italic self-end mt-auto tracking-wider bg-black/60 text-white rounded-md px-2 text-xs sm:text-sm">
                          {element.episode_count}
                        </div>
                        <div className="absolute p-2 bg-white/60 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-90 hover:bg-white rounded-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] smoothie">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="black"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-play"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div class="w-full max-w-7xl mx-auto">
            <div class="w-full flex flex-col gap-2 my-8 mx-auto">
              <div class="text-xl md:text-2xl px-1 z-30 text-white font-medium">You may also Like</div>
              <div class="flex flex-wrap w-full">
                {
                  similarMovies?.map((element , index) => {
                    return (<a key={element.name} class="relative transition-all ease-in duration-300 flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/4 lg:w-1/6 rounded-lg flex-shrink-0" href={`/tv/${element.id}`}>
                    <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-black transition-all">
                        <LazyLoadImage
                            className="w-full h-full object-cover"
                            src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
                            alt=""
                            effect="blur"
                            wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: {height: "100%"  ,transition: "transform 0.3s ease-in" ,},
                            }}
                            visibleByDefault={true}
                        />
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 inset-0 bg-gradient-to-t from-black to-[rgba(0,0,0,0.40)]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.40)]"></div>
                        <div className="absolute inset-x-0 bottom-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                            <div>
                                <div className="flex flex-col justify-between items-start">
                                    <h1 className="text-white w-[100%] text-[13px] font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
                                        {element.title || element.original_name}
                                    </h1>
                                    <div className='flex flex-row justify-between w-full items-center'>
                                        <div className="flex items-center text-[10px] w-full my-1 space-x-1">
                                            <span className="text-yellow-400 text-xs">★</span>
                                            <span className="text-white font-bold">{element.vote_average.toFixed(1)}</span>
                                            <span className="text-white font-bold">|</span>
                                            <span className="text-white font-bold">HD</span>
                                            <span className="text-white font-bold">•</span>
                                            <span className="text-white font-bold">{element.media_type === "movie" ? "Movie" : "TV"}</span>
                                        </div>
                                        <div className="text-gray-100 text-[10px]">
                                            {element.release_date?.substring(0, 4) || element.first_air_date?.substring(0, 4)}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-rows-[0fr] transition-all group-hover:grid-rows-[1fr]">
                                    <p className="overflow-hidden text-white/70 opacity-0 transition duration-500 group-hover:opacity-100 text-white text-sm text-[10px]">
                                        {element.overview.substring(0, 200) + "..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>)
                  })
                }
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HeroTv;
