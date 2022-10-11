import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';
import { ToastContainer } from 'react-toastify';


const Home =() =>{
  return (
    <div className="App">
      <Header></Header>
      <main>
        <div><ProfileCard/></div>  
      </main>
      <ToastContainer position="top-right" autoClose={2000}/>
      <Footer></Footer>
    </div>
  );
}
export default Home;
