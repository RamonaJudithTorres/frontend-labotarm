import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import TarjetaHorizontal from '../components/Tarjeta';
import { ToastContainer } from 'react-toastify';
import { getAllTarjetas } from "../redux/tarjetaSlice";
import { useDispatch, useSelector } from "react-redux";
import {Grid, Box, Center} from '@chakra-ui/react';


const Home =() =>{

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const {listTarjetas} = useSelector((state) => state.tarjeta);

  useEffect(()=>{
   
   dispatch(getAllTarjetas(pageNumber, pageSize));
   console.log(listTarjetas);

   },[dispatch])

   const AllCards = () => {
    return (
      listTarjetas.map((value, key) => (
        <TarjetaHorizontal key={key} value={value}/>
      ))
    )

  }

  return (
    <div className="App">
      <Header></Header>
      <main>
      <Carousel/>

<Center> 

     <Box mx="auto"  m={[2, 3]}  p={[5, 6]}>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        {listTarjetas && 
        <AllCards />}
         </Grid>
         </Box>
         </Center>

      </main>
      <ToastContainer position="top-right" autoClose={2000}/>
      <Footer></Footer>
    </div>
  );
}
export default Home;
