
import './App.css';
import NavigationBar from './components/NavigationBar';
import {  Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';


//6jAYLwBpvKKB9w73VnO2DEAN2sPyGGpL
function App() {
  //const apiKey = "6jAYLwBpvKKB9w73VnO2DEAN2sPyGGpL"
  

  return (
      <div>  
    <NavigationBar/>
   
    <Routes>
      <Route path = "/" element = {<HomePage/>}>

      </Route>
      <Route path = "/favorite" element = {<Favorites/>}>

      </Route>
    </Routes>
    
     </div>
    
  
  );
}

export default App;
