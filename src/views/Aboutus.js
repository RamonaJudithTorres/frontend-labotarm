import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  Flex,
  Box,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";


const AboutUs = () => {
  return (
    <div className="App">
    <Header/>
    <main>
    <Box
            height='490px'
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={"/assets/image/nosotros.png"}>
        </Box>

      <div>

      <Flex flexWrap={"wrap"} m={100} gap="20" alignItems="center" justifyContent="center" flexDirection="row">


      <SimpleGrid columns={[1, null, 2]} spacing='40px'>
  <Box  height='400px'>
  <Heading fontSize={"3xl"} textColor='blue.700' >Misión</Heading>
  <Text fontSize='xl'> Parte de nuestra misión es brindar un servicio de exámenes de análisis clínicos de calidad, eficientes, confiables y oportunos. 
  Que nuestros clientes queden satisfechos con el trato humano y calificado.</Text>
  </Box>


  <Box height='400px'>
  <Heading fontSize={"3xl"} textColor='blue.700' >Visión</Heading>
  <Text fontSize='xl'> Cubrir las necesidades de nuestros pacientes 
  como de otras entidades clínicas convirtiéndonos en una opción de confianza</Text>

  </Box>
    </SimpleGrid>

      </Flex>
      </div>
    </main>
    <Footer/>
  
  </div>
)


};
export default AboutUs;
