import Home from './components/Home';
import Movie from './components/Movie';
import Navbar from './components/Navbar'
import {BrowserRouter as Router , Routes, Route, useParams} from 'react-router-dom' ;
import HeroMovie from './components/HeroMovie';
import Tv from './components/Tv';
import HeroTv from './components/HeroTv';
import WatchTv from './components/WatchTv';
import WatchMovie from './components/WatchMovie';
import SearchTab from './components/SearchTab';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Userview from './components/Userview';
function App() {
  const usePar = useParams() ;
  return (
    <div className="App">     
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/login" element={<SignIn/>}/> 
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/user" element={<Userview/>}/>
          <Route exact path="/movie/" element={<Movie key="popular" category="popular"/>}/> 
          <Route exact path="/movie/trending" element={<Movie key="trending" category="trending"/>}/> 
          <Route exact path="/movie/:id" element={<HeroMovie/>}/>
          <Route exact path="/movie/watch/:id" element={<WatchMovie/>}/>
          <Route exact path="/tv" element={<Tv key="popular" category="popular"/>}/>
          <Route exact path="/tv/trending" element={<Tv key="trending" category="trending"/>}/>
          <Route exact path="/tv/:id" element={<HeroTv/>}/>
          <Route exact path="/tv/:id/:S/:E" element={<WatchTv/>}/>
          <Route exact path="/search/:query" key="search" element={<SearchTab/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
