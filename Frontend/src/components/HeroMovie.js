import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { doc, updateDoc, getDoc, } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";

const HeroMovie = () => {
  const [info, setInfo] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    const CheckWishlist = async (movieData1) => {
      try {
        let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
        if (!user || !user.uid) {
          console.error("User is not logged in or user ID not found.");
          return; // or handle the login/signup flow
        }
        const userWishlist = JSON.parse(sessionStorage.getItem('wishlist') || localStorage.getItem('wishlist') || '[]');

        if (userWishlist && userWishlist.some(movie => movie.id === movieData1.id)) {
          
          setIsWishlisted(true);
        } else {
          
          setIsWishlisted(false);
        }

        // const userRef = doc(db, "users", user.uid);

        // // Fetch the user's document to get the current wishlist data
        // const userSnapshot = await getDoc(userRef);

        // if (userSnapshot.exists()) {
        //   const userData = userSnapshot.data();
        //   let wishlist = userData.wishlist || [];

        //   if (!Array.isArray(wishlist)) {
        //     wishlist = [];
        //   }

        //   const existingIndex = wishlist.findIndex(
        //     (movie) => movie.id === movieData1.id
        //   );

        //   if (existingIndex !== -1) {
        //     // Movie already in the wishlist - Do nothing or update the timestamp
        //     setIsWishlisted(true);
        //   } else {
        //     // Add new movie data
        //     setIsWishlisted(false);
        //   }
        //   console.log("Movie added to Wishlist");
        // } else {
        //   console.error("No user document found for this user ID:", user.uid);
        //   // Handle the case where the user document doesn't exist yet
        // }
      } catch {

      }
    }
    const getMovieData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      setInfo(data);
      CheckWishlist(data);
      const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=748d8f1491929887f482d9767de12ea8&language=en-US`;
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setCast(data2.cast);
      const url3 = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=748d8f1491929887f482d9767de12ea8&language=en-US&page=1'`
      const response3 = await fetch(url3);
      const data3 = await response3.json();
      setSimilarMovies(data3.results);
    };
    getMovieData();
    
    // const getColor = async() => {
    //     const uri = `https://image.tmdb.org/t/p/original${info.poster_path}`
    //     const result = await ImageColors.getColors(uri, {
    //         fallback: '#228B22',
    //         cache: true,
    //         key: 'unique_key',
    //       })

    // }

    var x = document.getElementById("loading-bar");
    x.classList.add("transition-all", "duration-300", "ease-in-out");
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        x.classList.remove(`w-[${i * 25}%]`);
        x.classList.add(`w-[${(i + 1) * 25}%]`);
      }, 80);
    }
    if (isWishlisted != null) {
      x.classList.remove("w-[100%]");
    }

    setTimeout(() => {
      setLoading(false);
    }, 250);
    setTimeout(() => {
      x.classList.add("w-0");
    }, 300);
  }, [isWishlisted, id]);

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
          media_type: "movie",
          title: movieData1.title,
          timestamp: new Date(),
        };

        if (existingIndex !== -1) {
          // Movie already in the wishlist - Do nothing or update the timestamp
          setIsWishlisted(false);
          wishlist.splice(existingIndex, 1);
          console.log("Movie removed from wishlist");
        } else {
          // Add new movie data
          setIsWishlisted(true);
          wishlist.push(movieData);
        }
        if(sessionStorage.getItem('user') !== null) {
          sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        else if(localStorage.getItem('user') !== null) {
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        toast.success(`Movie ${existingIndex !== -1 ? 'removed from' : 'added to'} wishlist`)
        await updateDoc(userRef, { wishlist });
      } else {
        console.error("No user document found for this user ID:", user.uid);
        // Handle the case where the user document doesn't exist yet
      }

    } catch (error) {
      console.error('Error adding to continue watching: ', error);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="h-[2px] w-full z-50 absolute">
        <div
          id="loading-bar"
          className="transition-all w-[0%] h-[2px] bg-red-800"
        ></div>
      </div>
      <ToastContainer />
      {!info && loading && <div className="flex h-full w-full justify-center items-center"><Spinner/></div>}
      {info && <div>
        {!loading && (
          <div
            className="relative flex flex-col gap-9 md:gap-16 h-screen"

          >
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
              <div className="bg-transparent mt-[75px] md:mt-[100px] gap-5 py-8 w-full px-4 max-w-7xl mx-auto flex flex-col md:flex-row z-20 top-0  left-0 h-full  sm:flex-row">
                <div class="flex-shrink-0 mx-auto md:mx-10 w-[180px] md:w-[30%] md:max-w-[275px] overflow-hidden">
                  <div class="rounded-lg md:rounded-xl overflow-hidden aspect-[1/1.5] flex-shrink-0 backdrop-blur bg-white/5">
                    <span class=" lazy-load-image-background blur lazy-load-image-loaded inline-block text-transparent w-full h-full">
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/w780/${info.poster_path}`}
                        width="100%"
                        height="100%"
                        effect="blur"
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </div>
                </div>

                <div class="RIGHT w-[80%] scrollbar-hide z-10 md:px-4 md:pb-4 m-auto md:w-[60%] tracking-wide">
                  <div class="w-full mx-auto md:w-full flex flex-col gap-7 tracking-wide">
                    <div class="flex flex-col gap-2  items-center md:items-start">
                      <div class="text-xl sm:text-2xl lg:text-3xl text-white !uppercase line-clamp-3 !leading-tight  pb-1 text-center md:text-start font-bold">
                        {info.title}
                      </div>
                      <div class="flex gap-3 items-center">
                        <div class=" text-slate-300 text-sm tracking-wider">
                          {info.release_date}
                        </div>
                        <div class="gap-1 bg-[#00c1db17] py-1 px-2 rounded-md flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="gold"
                            stroke="gold"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-star"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span class="!text-xs text-white font-medium">
                            {info?.vote_average?.toFixed(1)}{" "}
                          </span>
                        </div>
                        <span class="uppercase !text-sm text-slate-200">
                          {info?.original_language}
                        </span>
                      </div>
                    </div>
                    <div class="-my-[12px] flex flex-shrink-0 gap-2 flex-wrap justify-center md:justify-start items-center">
                      {info.genres?.map((genre) => (
                        <a
                          key={genre.id}
                          class="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium  bg-[#00c1db33] rounded-md text-[#00c1db]"
                          href="/explore?type=movie&amp;genre=878"
                        >
                          {genre.name}
                        </a>
                      ))}
                    </div>
                    <div class="order-3 md:order-none text-[#D4D4D8] text-sm lg:text-base font-normal md:!leading-tight tracking-wider">
                      <div>
                        <span class="italic smoothie">{info.overview}</span>
                      </div>
                    </div>
                    <div class="flex gap-3 w-full">
                      <a
                        class="ring-white gap-2 min-w-fit text-sm md:text-base  p-2 font-semibold rounded-md overflow-hidden bg-white/80 text-black justify-center hover:brightness-[.8] items-center flex w-1/2 md:w-[10rem] !whitespace-nowrap  "
                        href={`/movie/watch/${info?.id}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="black"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-play"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Play Now
                      </a>
                      <div
                        onClick={() => addToWishlist(info)}
                        class="ring-white gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 p-2 rounded-md overflow-hidden hover:bg-white/10 hover:cursor-pointer justify-center items-center flex w-1/2 md:px-5 md:w-[12rem] !whitespace-nowrap"

                      >
                        {(isWishlisted != null) && !isWishlisted && <span class="gap-1 flex text-white justify-center items-center smoothie !duration-500 origin-center">
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
                        {(isWishlisted != null) && isWishlisted &&
                          <span class="gap-1 text-white flex justify-center items-center smoothie !duration-500 origin-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            Added
                          </span>
                        }
                      </div>
                    </div>
                    <div
                      className="flex gap-3"
                      style={{
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      {" "}
                      {/* Added flex-wrap and overflow-hidden */}
                      {cast?.slice(0, 6).map(
                        (element /* Slice to show first 5 cast members */) =>
                          element.profile_path && (
                            <span
                              key={element.id}
                              className="flex-shrink-0 rounded-full w-16 h-16 md:w-20 md:h-20 bg-white/5 overflow-hidden flex items-center justify-center"
                            >
                              <span className="lazy-load-image-background blur lazy-load-image-loaded inline-block text-transparent w-full h-full">
                                <LazyLoadImage
                                  src={`https://image.tmdb.org/t/p/w342${element.profile_path}`}
                                  alt={element.name}
                                  effect="blur"
                                  className="w-full h-full object-cover  object-center"
                                />
                              </span>
                            </span>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full max-w-7xl mx-auto">
              <div class="w-full flex flex-col gap-2 my-8 mx-auto">
                <div class="text-xl md:text-2xl px-1 z-30 text-white font-medium">You may also Like</div>
                <div class="flex flex-wrap w-full">
                  {
                    similarMovies?.map((element, index) => {
                      return (
                        <a key={element.id} class="relative transition-all ease-in duration-300 flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/4 lg:w-1/6 rounded-lg flex-shrink-0" href={`/movie/${element.id}`}>
                          <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-black transition-all">
                            <LazyLoadImage
                              className="w-full h-full object-cover"
                              src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
                              alt=""
                              effect="blur"
                              wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: { height: "100%", transition: "transform 0.3s ease-in", },
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
                        </a>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            {/* <div className='absolute w-[94%] overflow-hidden mx-4 md:mx-10 font-sans font-medium'>
                        <h1>Movie Cast</h1>
                        <div className='mt-2'>
                            <Swiper
                                freeMode={true}
                                grabCursor={true}
                                modules={[FreeMode, Navigation, Pagination, Mousewheel, Scrollbar, A11y, EffectFade, Keyboard]}
                                keyboard={true}
                                navigation
                                height={400}
                                draggable={true}
                                pagination={{ clickable: true }}
                                className="mySwiper px-2"
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                        spaceBetween: 20
                                    },
                                    480: {
                                        slidesPerView: 4,
                                        spaceBetween: 30
                                    },
                                    768: {
                                        slidesPerView: 6,
                                        spaceBetween: 30
                                    },

                                }}
                            >
                                {
                                    cast.map((element, index) => {
                                        if (index < 15) {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div class="max-w-[160px] h-[320px] rounded overflow-hidden shadow-lg">
                                                        <LazyLoadImage effect='blur' class="w-full " src={`https://image.tmdb.org/t/p/original${element.profile_path}`} alt="Sunset in the mountains" />
                                                        <div class="px-2 md:px-6 py-4">
                                                            <div class="font-bold text-sm">{element.original_name}</div>
                                                            <p class="text-gray-700 text-[10px]">
                                                                {element.character}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        }

                                    })
                                }
                            </Swiper>
                        </div>
                    </div> */}
          </div>
        )}
      </div>}
    </div>
  );
};

export default HeroMovie;
