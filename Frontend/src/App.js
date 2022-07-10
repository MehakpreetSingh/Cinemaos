import Home from './components/Home';
import Navbar from './components/Navbar'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom' ;
import HeroMovie from './components/HeroMovie';
import Tv from './components/Tv';
import HeroTv from './components/HeroTv';
import WatchTv from './components/WatchTv';

function App() {
  return (
    <div className="App">     
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/movie/:id" element={<HeroMovie/>}/>
          <Route path="/tv" element={<Tv/>}/>
          <Route path="/series/:id" element={<HeroTv/>}/>
          <Route path="/series/:id/:S/:E" element={<WatchTv/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
