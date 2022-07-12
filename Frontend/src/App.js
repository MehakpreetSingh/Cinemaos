import Home from './components/Home';
import Movie from './components/Movie';
import Navbar from './components/Navbar'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom' ;
import HeroMovie from './components/HeroMovie';
import Tv from './components/Tv';
import HeroTv from './components/HeroTv';
import WatchTv from './components/WatchTv';
import WatchMovie from './components/WatchMovie';
import SearchTab from './components/SearchTab';

function App() {
  return (
    <div className="App">     
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/movie/" element={<Movie/>}/> 
          <Route exact path="/movie/:id" element={<HeroMovie/>}/>
          <Route exact path="/movie/watch/:id" element={<WatchMovie/>}/>
          <Route exact path="/tv" element={<Tv/>}/>
          <Route exact path="/tv/:id" element={<HeroTv/>}/>
          <Route exact path="/tv/:id/:S/:E" element={<WatchTv/>}/>
          <Route exact path="/search/:query" key="search" element={<SearchTab/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
