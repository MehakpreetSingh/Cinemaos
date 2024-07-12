import React, { useState, useEffect } from 'react'
import { doc, updateDoc, getDoc, } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import bgHome from '../bg-home.png'
import Spinner from './Spinner';

const Userview = () => {
  const [activeTab, setActiveTab] = useState("continueWatching");
  const [wishlist, setWishlist] = useState(null);
  const [movies, setMovies] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent'); // Default to 'recent'

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const deleteFromWishlist = async (id,list = wishlist , watching = movies) => {
    let array  = activeTab==='wishlist' ? list : watching;
    const existingIndex = array.findIndex(
      (movie) => movie.id === id
    );
    if (existingIndex !== -1) {
      // Movie already in the wishlist - Do nothing or update the timestamp
      array.splice(existingIndex, 1);
      if(activeTab === 'wishlist') {
        setWishlist(array);
        if(sessionStorage.getItem('user') !== null) {
          sessionStorage.setItem('wishlist', JSON.stringify(array));
        }
        else if(localStorage.getItem('user') !== null) {
          localStorage.setItem('wishlist', JSON.stringify(array));
        }
      }else {
        setMovies(array)
        if(sessionStorage.getItem('user') !== null) {
          sessionStorage.setItem('continueWatching', JSON.stringify(array));
        }
        else if(localStorage.getItem('user') !== null) {
          localStorage.setItem('continueWatching', JSON.stringify(array));
        }
      }
    }
    try {
      let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
      if (!user || !user.uid) {
        console.error("User is not logged in or user ID not found.");
        return; // or handle the login/signup flow
      }

      const userRef = doc(db, "users", user.uid);
      if(activeTab === 'wishlist') {
        await updateDoc(userRef, { wishlist:array });
      }else {
        await updateDoc(userRef, { continueWatching : array });
      }
      
    } catch (error) {
      console.error('Error adding to continue watching: ', error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setMovies(userData.continueWatching || []);
        setWishlist(userData.wishlist || [])
      } else {
        console.error("No user document found for this user ID:", user.uid);
      }
    };
    fetchMovies();
  }, [activeTab , wishlist , movies])
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleClear = async () => {
    let user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
    const userRef = doc(db, "users", user.uid);
    if (activeTab === "continueWatching") {
      setMovies([]);
      await updateDoc(userRef, {
        continueWatching: [],
      });
    } else {
      setWishlist([]);
      await updateDoc(userRef, {
        wishlist: [],
      })
    }

  }
  const getMediaData = () => {
    if (activeTab === "continueWatching") {
      if (sortOrder === 'recent') {
        return movies
      } else {
        return movies.slice(0).reverse()
      }
    }
    else {
      if (sortOrder === 'recent') {
        return wishlist
      } else {
        return wishlist.slice(0).reverse()
      }
    }
  }
  return (
    <div class="pt-16 w-full mx-auto max-w-[1400px]">
      <div class="h-60 w-full left-0 absolute z-0 top-0 opacity-60 overflow-hidden"><span class=" lazy-load-image-background blur lazy-load-image-loaded" ><LazyLoadImage effect='blur' src={bgHome} alt="" width="100%" height="100%" class="w-full h-full object-cover object-center blur-sm" /></span></div>
      <div class="h-[176px] flex flex-col justify-end items-center relative">
        <div class="absolute top-1/2 -translate-y-1/2 text-2xl font-semibold text-white my-auto">Good Evening!</div>
        <div class="w-full p-3 flex justify-evenly sm:justify-center gap-5 flex-wrap sm:gap-12 z-10 text-white font-medium text-sm md:text-base">
          <button onClick={() => handleTabClick("continueWatching")} style={{
            borderBottom: activeTab === "continueWatching" ? "2px solid white" : "none",
            transition: "border-bottom 0.3s ease-in-out"
          }} class="tabs hover:cursor-pointer smoothie flex gap-1 items-center relative" >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M12 7v5l4 2"></path>
            </svg>
            <span class="hidden text-white sm:flex">Continue Watching</span>
          </button>
          <button onClick={() => handleTabClick("wishlist")} style={{
            borderBottom: activeTab === "wishlist" ? "2px solid white" : "none",
            transition: "border-bottom 0.3s ease-in-out"
          }} class="false hover:cursor-pointer smoothie flex gap-1 items-center relative" >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <span class="hidden text-white sm:flex">Watchlist</span>
          </button>
        </div>
      </div>
      {(movies===null) && (wishlist===null) && <div className='flex justify-center items-center'><Spinner/></div>}
      {wishlist && movies && <div class="w-full my-2 px-2 max-w-6xl mx-auto smoothie min-h-screen">
        <div class="flex justify-between items-center my-4 mt-5">
          {(activeTab === "continueWatching") && <div class="flex items-center gap-2 text-2xl font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-white sm:hidden">History</span><span class="hidden text-white sm:flex">Continue Watching</span>
          </div>}
          {(activeTab === "wishlist") && <div class="flex items-center gap-2 text-2xl text-white font-medium"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> WatchList</div>}
          <select value={sortOrder}
            onChange={handleSortChange} class="p-1 rounded-md bg-white text-black font-medium outline-none">
            <option value="recent">Recent </option>
            <option value="old">Oldest </option>
          </select>
        </div>
        {activeTab === 'wishlist' && wishlist.length === 0 && (
          <div className="flex items-center justify-center w-full text-sm h-40 text-white">
            Your WatchList is Empty!
          </div>
        )}

        {/* Continue Watching tab and continueWatching empty */}
        {activeTab === 'continueWatching' && movies.length === 0 && (
          <div className="flex items-center justify-center w-full text-sm h-40 text-white">
            You Haven't Watched Anything Yet!!
          </div>
        )}
        <div class="flex flex-wrap w-full ">
          {getMediaData()?.slice(0).reverse().map((element) => {
            return (
              <div key={element.id} class="flex z-0 flex-col gap-2 p-1 lg:p-2 w-full sm:w-1/2 md:w-1/3 xl:w-1/4 sm:aspect-video mb-2 group" >
                <div class="flex-shrink-0 h-full w-full relative rounded-lg overflow-hidden shadow-md bg-[var(--light)]">
                  <span class=" lazy-load-image-background blur lazy-load-image-loaded" ><LazyLoadImage effect='blur' width="100%" height="100%" src={`https://image.tmdb.org/t/p/w780/${element.backdrop_path}`} class="w-full h-full object-cover object-center group-hover:scale-105 smoothie" /></span>
                  <span onClick={()=>deleteFromWishlist(element.id)} class="absolute transition-all ease-in duration-100 xl:opacity-0 group-hover:opacity-100 top-2 right-2 cursor-pointer z-50 bg-white/90 hover:bg-[#d83b44] hover:brightness-90 rounded-lg shadow-lg flex items-center justify-center smoothie p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="p-[.45rem] shrink-0 size-8 hover:text-white text-black transition duration-75 ease-in">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </span>
                  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black" ></div>
                  <div class="absolute p-3 px-4 flex flex-col gap-1 z-20 w-full bottom-0 left-0 tracking-wide">
                    <button class="flex justify-between items-center flex-grow" href={`/${element.media_type}/watch/${element.id}`}>
                      <div class="flex gap-1 h-fit flex-col tracking-wide"><span class="line-clamp-2 text-white !leading-tight text-sm font-medium !capitalize">{element.title}</span></div>
                      <span class="flex-shrink-0 smoothie bg-whites/20 backdrop-blur-sm group-hover:bg-white/20 group-active:bg-[#00c1dbef] p-2 items-center flex justify-center rounded-full h-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          {!(getMediaData().length === 0) && <div onClick={handleClear} class="flex justify-end my-3 w-full"><button class="bg-white/10 rounded-lg text-white p-2 px-4">Clear</button></div>}
        </div>
      </div>}
    </div>
  )
}

export default Userview
