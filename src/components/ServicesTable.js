import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Sidebar from "../components/Sidebar";
import { Grid, GridItem, useColorModeValue, } from '@chakra-ui/react'
import { getAllServices } from "../redux/patientSlice";
import { useDispatch, useSelector } from "react-redux";


import { ChakraProvider } from "@chakra-ui/react";

// Use Chakra Ui for create a custom component for display field data in table
import {
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

// Recommended for icons
import { FiTrash2, FiUser } from "react-icons/fi";



export function ServicesTable(value,key) {
  console.log('data', value)

  return (
    
    <Tbody  key={key} value={value} >
  
      <Tr >
        <Td>{value.value.clave}</Td>
        <Td>{value.value.paciente.nombre} </Td>
        <Td >{value.value.estudio.length} </Td>
        <Td >{value.value.fecha} </Td>
      </Tr>
      </Tbody>
    
  );
}