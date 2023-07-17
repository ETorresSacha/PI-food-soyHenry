import './App.css';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import HomePage from './components/homePage/HomePage';
import DetailRecipe from './components/detailPage/DetailRecipe';
import FormPage from './components/formPage/FormPage.jsx';
import ErrorPage from './components/errorpage/ErrorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/detail/:id' element={<DetailRecipe/>}></Route>
        <Route path='/form' element={<FormPage/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
