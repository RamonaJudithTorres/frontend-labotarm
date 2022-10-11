import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {AnalisisTable} from '../components/AnalisisTable';
import { useDispatch, useSelector } from "react-redux";
import { getAllEstudios } from "../redux/analisisSlice";

import {
  Grid, GridItem, useColorModeValue,
  Flex,
  Avatar,
  Text,
  Box,
  Icon,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Analisis = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const {listEstudios} = useSelector((state) => state.estudio);

  useEffect(()=>{
   
    dispatch(getAllEstudios(pageNumber, pageSize, ''));
    console.log(listEstudios);
     },[dispatch])


    const AllAnalisis = () => {
 
     return (
      listEstudios.map((value, key) => (
         <AnalisisTable key={key} value={value}/>
       ))
     )
   }


  return (
    <div className="App">
        <main>

  <Grid templateAreas={` "nav main"`} gridTemplateRows={'50px 1fr 30px'} gridTemplateColumns={'150px 1fr'} h='200px'
  gap='1'color='blackAlpha.700' fontWeight='bold'>
  
    <GridItem pl='2'pt={10} area={'nav'}> 
      <Sidebar/>
    </GridItem>

    <GridItem pl='6'mx='6' area={'main'}>
    
    <Box p="12">
    <Heading size="md" as="h2">
      Lista de Estudios
    </Heading>

    <TableContainer>
  <Table variant='simple' >
    <Thead>
      <Tr>
        <Th  color="blue.600">Nombre</Th>
        <Th  color="blue.600">Clave</Th>
      </Tr>
    </Thead>
  
    {listEstudios&&
    <AllAnalisis/>}
  </Table>
</TableContainer>
</Box>
    </GridItem>

  </Grid>
      </main>
    </div>
  );
};
export default Analisis;
