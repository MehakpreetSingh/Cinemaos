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
import { ProtectedRoute } from './components/ProtectedRoute';
import SeasonModal from './components/SeasonModal';
function App() {
  const usePar = useParams() ;
  return (
    <div className="App bg-black ">     
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/home" element={<Home/>}/> 
          <Route exact path="/" element={
            <SignIn/>}/> 
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/watchlist" element={<ProtectedRoute><Userview/></ProtectedRoute>}/>
          <Route exact path="/movie/" element={<ProtectedRoute><Movie key="popular" category="popular"/></ProtectedRoute>}/> 
          <Route exact path="/movie/trending" element={<ProtectedRoute><Movie key="trending" category="trending"/></ProtectedRoute>}/> 
          <Route exact path="/movie/:id" element={<ProtectedRoute><HeroMovie key={`${useParams().id}`}/></ProtectedRoute>}/>
          <Route exact path="/movie/watch/:id" element={<ProtectedRoute><WatchMovie /></ProtectedRoute>}/>
          <Route exact path="/tv" element={<ProtectedRoute><Tv key="popular" category="popular"/></ProtectedRoute>}/>
          <Route exact path="/tv/trending" element={<ProtectedRoute><Tv key="trending" category="trending"/></ProtectedRoute>}/>
          <Route exact path="/tv/:id" element={<ProtectedRoute><HeroTv/></ProtectedRoute>}/>
          <Route exact path="/tv/:id/:S/:E" element={<ProtectedRoute><SeasonModal key={`${useParams().id}-${useParams().S}-${useParams().E}`}/></ProtectedRoute>}/>
          {/* <Route exact path="/tv/:id/:S/:E" element={<ProtectedRoute><WatchTv/></ProtectedRoute>}/> */}
          <Route exact path="/search/:query" key="search" element={<ProtectedRoute><SearchTab/></ProtectedRoute>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
