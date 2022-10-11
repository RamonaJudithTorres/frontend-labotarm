import React, { useEffect } from "react";
import { formik, useField, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../redux/patientSlice";
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

export default function NewPatientCard() {
  const dispatch = useDispatch();
  const { isLogin, paciente} = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const initialValues = {
    nombre: '',
    edad: '',
    telefono: '',
  };
  
  const onSubmit = (values) => {
    dispatch(
      createPatient({
        nombre: values.nombre,
        edad: values.edad,
        telefono: values.telefono,
      })
    );
  };

  const formik = useFormik({ initialValues, onSubmit });

  // useEffect(() => {
  //   if (paciente) {
  //     alert("revisa tu bandeja de email");
  //   } else {
  //     alert("Algo salió mal creando tu paciente, mi chato :( ");
  //   }
  // }, [paciente]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingresar datos de le Pacienté</Heading>
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
                <FormLabel>Nombre del Paciente</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
              </FormControl>
              <FormControl id="edad">
                <FormLabel>Edad</FormLabel>
                <Input
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.edad}
                />
              </FormControl>
              <FormControl id="telefono">
                <FormLabel>telefono</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.telefono}
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
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  CREAR PACIENTE
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
