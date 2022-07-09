import Home from './components/Home';
import Navbar from './components/Navbar'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom' ;
import HeroMovie from './components/HeroMovie';

function App() {
  return (
    <div className="App">     
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/movie/:id" element={<HeroMovie/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
