import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import NewPatientCard from "../components/NewPatientCard"

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

const Createpatient = () => {


  return (
    <div className="App">
        <main>

  <Grid templateAreas={` "nav main"`} gridTemplateRows={'50px 1fr 30px'} gridTemplateColumns={'150px 1fr'} h='200px'
  gap='1'color='blackAlpha.700' fontWeight='bold'>
  
    <GridItem pl='2'pt={10} area={'nav'}> 
      <Sidebar/>
    </GridItem>

    <GridItem pl='6'mx='6' area={'main'}>
    
    <NewPatientCard/>

    </GridItem>

  </Grid>
      </main>
    </div>
  );
};
export default Createpatient;
