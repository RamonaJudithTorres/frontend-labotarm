import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Analisis from './views/Analisis';
import Patient from './views/Patient';
import VerifyUser from './views/verifyUser';
import Profile from './views/Profile';
import Createpatient from './views/Createpatient';
import Estudios from './views/Estudios';
import AboutUs from './views/Aboutus'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route name="Home" path='/' exact element={<Home/>}/>
      <Route name="Login" path='/login' exact element={<Login/>}/>     
      <Route name="Register" path='/register' exact element={<Register/>}/>    
      <Route name="Dashboard" path='/dashboard' exact element={<Dashboard/>}/>
      <Route name="Analisis" path='/analisis' exact element={<Analisis/>}/>
      <Route name="Estudios" path='/estudios' exact element={<Estudios/>}/>
      <Route name="Patient" path='/patients' exact element={<Patient/>}/>
      <Route name="Profile" path='/profile' exact element={<Profile/>}/>  
      <Route name="About-us" path='/about_us' exact element={<AboutUs/>}/>  
      <Route name="Verify-user" path='/verify-user/' exact element={<VerifyUser/>}/>   
      <Route name="Createpatient" path='/services' exact element={<Createpatient/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
