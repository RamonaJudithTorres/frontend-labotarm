import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {PatientTable} from '../components/PatientTable';
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../redux/patientSlice";
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
} from "@chakra-ui/react";
import { SmallAddIcon } from '@chakra-ui/icons';

const Patient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const {listPatient} = useSelector((state) => state.paciente);

 
  const createPatient = () => {
    navigate('/create_patient')
  }

  useEffect(()=>{
   
    dispatch(getAllPatients(pageNumber, pageSize));
    console.log(listPatient);
     },[dispatch])


    const AllPatients = () => {
 
     return (
      listPatient.map((value, key) => (
         <PatientTable key={key} value={value}/>
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
    <Flex h={16}  justifyContent={'space-between'}> 
    <Heading size="md" as="h2" mx={"auto"}>
      Información de Pacientes
    </Heading>
    <Button colorScheme='teal' size='sm' onClick={createPatient} > Agregar paciente <SmallAddIcon/></Button>
    </Flex>
    <TableContainer>
  <Table variant='simple' >
    <Thead>
      <Tr>
        <Th>Nombre</Th>
        <Th>Edad</Th>
        <Th>Teléfono</Th>
      </Tr>
    </Thead>
  
    {listPatient&&
    <AllPatients/>}
  </Table>
 
</TableContainer>

</Box>

    </GridItem>

  </Grid>
      </main>
    </div>
  );
};
export default Patient;
