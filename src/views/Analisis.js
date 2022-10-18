import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {AnalisisTable} from '../components/AnalisisTable';
import { useDispatch, useSelector } from "react-redux";
import { getAllEstudios } from "../redux/analisisSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

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
import {SearchIcon, SmallAddIcon } from '@chakra-ui/icons';


const Estudios = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [inputSearch, setinputSearch] = useState("");
  const {listEstudios} = useSelector((state) => state.estudio);
  const navigate = useNavigate();

  const createEstudio = () => {
    navigate('/create_estudio')
  }

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
  <GridItem pl='2' area={'header'}  mt="8">
  <Flex h={16}  justifyContent={'space-between'}> 
    <Heading size="md" as="h2" mx={"auto"}>
      Estudios
    </Heading>
    <Button colorScheme='teal' size='sm' onClick={createEstudio} > Agregar estudio <SmallAddIcon/></Button>
    </Flex>
    <Center >
     <Box >
       <InputGroup>
          <InputRightElement
            children={<SearchIcon/>} onClick={searchEstudio}  />
          <Input onKeyDown={handleKeyDown}  placeholder='Buscar estudios..' bg="white" size={"md"} onChange={(e) => setinputSearch(e.target.value)} width='700px'/>
       </InputGroup>
    </Box>
    </Center>
  </GridItem>

  <GridItem pl='2'  area={'nav'}  mt="8">
  <Sidebar/>
  </GridItem>
  <GridItem pl='2' area={'main'}>
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