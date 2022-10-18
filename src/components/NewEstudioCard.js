import React, { useEffect } from "react";
import { formik, useField, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEstudio } from "../redux/analisisSlice";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function NewEstudioCard() {
  const dispatch = useDispatch();
  const { isLogin, paciente} = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const notify = () => toast.success("Estudio creado con éxito");

  const initialValues = {
    nombre: '',
    clave: '',
    descripcion: '',
  };
  
  const onSubmit = (values) => {
    dispatch(
      createEstudio({
        nombre: values.nombre,
        clave: values.clave,
        descripcion: values.descripcion,
      })
    );
    notify();
    navigate('/analisis');
  };

  const formik = useFormik({ initialValues, onSubmit });


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingresar información del estudio</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="nombre">
                <FormLabel>Nombre del Estudio</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
              </FormControl>
              <FormControl id="clave">
                <FormLabel>Clave</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.clave}
                />
              </FormControl>
              <FormControl id="descripcion">
                <FormLabel>Descripción</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.descripcion}
                />
              </FormControl>
              

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                </Stack>
                <Button
                  type="submit"       
                  bg={"teal.500"}
                  color={"white"}
                  _hover={{
                    bg: "teal.600",
                  }}
                >
                  CREAR ESTUDIO
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
