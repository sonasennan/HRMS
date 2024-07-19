import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Employee from './pages/employeelist';
import EachEmployee from './pages/eachEmployee';
import Designation from './pages/listDesignation';


function App()
{
  return (
    
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/employee' element={<Employee/>} />
      <Route path='/employee/:employee_id' element={<EachEmployee />} />
      <Route path='/designation' element={<Designation/>} />
      
     

        
      </Routes>
    </Router>
    
    );
}

export default App
