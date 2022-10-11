import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {ServicesTable} from '../components/ServicesTable';
import { Grid, GridItem, useColorModeValue,  Table, 
  Box,
  Heading,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../redux/serviceSlice";


const Login = () => {

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const {listService} = useSelector((state) => state.servicio);

  useEffect(()=>{
   
    dispatch(getAllServices(pageNumber, pageSize));
    console.log(listService);
     },[dispatch])


    const AllServices = () => {
 
     return (
      listService.map((value, key) => (
         <ServicesTable key={key} value={value}/>
       ))
     )
   }


  return (
    <div className="App">
        <main>

        <Grid
  templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='200px'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
  
>
  <GridItem  pb={4}  area={'header'}>
  <Header/>
  </GridItem>
  
  <GridItem pl='2'pt={9} area={'nav'}>
  <Sidebar/>
  </GridItem>

  <GridItem mt={10} pt={10} pl='6'mx='6' area={'main'}> 
    <Box p="12">
    <Heading size="md" as="h2"  pb={10} color='blue.700'>
      Servicios
    </Heading>

    <TableContainer>
  <Table variant='simple' >
    <TableCaption>Imperial to metric conversion factors</TableCaption>

    <Thead >
      <Tr>
        <Th color='blue.500'>Clave</Th>
        <Th color='blue.500'>Paciente</Th>
        <Th color='blue.500'>Estudio</Th>
        <Th color='blue.500'>Fecha</Th>
      </Tr>
    </Thead>
  
    {listService &&
    <AllServices/>}

  </Table>
</TableContainer>
</Box>
    </GridItem>

  
</Grid>
      </main>
    </div>
  );
};
export default Login;
