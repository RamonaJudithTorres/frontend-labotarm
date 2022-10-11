import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {AnalisisTable} from '../components/AnalisisTable';
import { useDispatch, useSelector } from "react-redux";
import { getAllEstudios } from "../redux/analisisSlice";
import Header from "../components/Header";

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
  Input,
  InputGroup,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import {SearchIcon } from '@chakra-ui/icons';


const Estudios = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [inputSearch, setinputSearch] = useState("");
  const {listEstudios} = useSelector((state) => state.estudio);


  useEffect(()=>{
   
    dispatch(getAllEstudios(pageNumber, pageSize,''));
    console.log(listEstudios);
     },[dispatch])

     const searchEstudio = () => {
      dispatch(getAllEstudios(pageNumber, pageSize, inputSearch));
    }
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        dispatch(getAllEstudios(pageNumber, pageSize, inputSearch));
      }
    } 


    const AllAnalisis = () => {
 
     return (
      listEstudios.map((value, key) => (
         <AnalisisTable key={key} value={value}/>
       ))
     )
   }


  return (

    <div className="App">
        <Header/>
    <main>
    <Box
            height='300px'
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={"/assets/image/analisis.png"}>
        </Box>
  <Grid  gridTemplateRows={'1fr 30px'} gridTemplateColumns={'1fr'} h='200px'
  gap='1'color='blackAlpha.700' fontWeight='bold'>

  <GridItem mt='10'pb='5'  >
  <Heading size="md" as="h2">
      Lista de Estudios
    </Heading>

  </GridItem>

    <GridItem  pb={6} pt={12} mx='6' >
      <Center>
     <Box>
       <InputGroup>
          <InputRightElement
            children={<SearchIcon/>} onClick={searchEstudio} />
          <Input onKeyDown={handleKeyDown}  placeholder='Buscar estudios..' bg="white" size={"md"} onChange={(e) => setinputSearch(e.target.value)} width='700px'/>
       </InputGroup>
    </Box>
    </Center>
   </GridItem>


    <GridItem pl='6'mx='6'>
    <Box p="12">
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
export default Estudios;
