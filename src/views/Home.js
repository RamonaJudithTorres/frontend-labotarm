import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import TarjetaHorizontal from '../components/Tarjeta';
import { ToastContainer } from 'react-toastify';
import { getAllTarjetas } from "../redux/tarjetaSlice";
import { useDispatch, useSelector } from "react-redux";
import {Grid, Box, Center, Flex, Heading, Button, Link} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";



const Home =() =>{

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const navigate = useNavigate();

  const {listTarjetas} = useSelector((state) => state.tarjeta);
  const gotoEstudios = () => {
    navigate('/estudios')
  }

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
      {/* <Grid templateColumns='repeat(2, 1fr)' gap={6}> */}
      <Flex flexWrap={"wrap"} gap="20" alignItems="center" justifyContent="center" flexDirection="row">
        {listTarjetas && 
        <AllCards />}
         </Flex>
         </Box>   
         </Center>
         <Flex h={16}  > 
          <Heading size="md" as="h4" mx={"auto"}>
          <Link href={'https://wa.me/528711384457'}> 
            Conoce los requerimentos para tus estudios comunicandote a nuestro whatsapp
            </Link>
          </Heading>
          <Button colorScheme='blue' size='lg'mx={"auto"} onClick={gotoEstudios} > <SearchIcon/> Buscar estudios   </Button>
          </Flex>

      </main>
      <ToastContainer position="top-right" autoClose={2000}/>
      <Footer></Footer>
    </div>
  );
}
export default Home;
