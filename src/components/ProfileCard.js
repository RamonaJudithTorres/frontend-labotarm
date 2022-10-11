import React, { useEffect } from "react";
import { formik, useField, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/authSlice";
import { ToastContainer, toast } from 'react-toastify';
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
  Select,
  Image,
} from "@chakra-ui/react";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const { isLogin, currentUser } = useSelector((state) => state.user);
  const notify = () => toast.success("Sesión finalizada");
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName:"",
    gender: "",
    phone: "",
    image_profile: "",
    points: 0,

  };
  const onSubmit = (values) => {
    dispatch(
      updateUser({
        user_email: values.email,
        points: values.points,
        first_name: values.firstName,
        last_name: values.lastName,
        image_profile: values.image_profile,
        gender: values.gender,
        phone: values.phone,
      })
    );
   };
  const formik = useFormik({ initialValues, onSubmit });
  
  useEffect(()=>{
  
  if (!isLogin){
    navigate('/')
  }


    formik.setFieldValue("email", currentUser?.user?.email);
    formik.setFieldValue("firstName", currentUser?.user?.first_name);
    formik.setFieldValue("lastName", currentUser?.user?.last_name);
    formik.setFieldValue("phone", currentUser?.phone);
    formik.setFieldValue("gender", currentUser?.gender);
    formik.setFieldValue("image_profile", currentUser?.image_profile);
    formik.setFieldValue("points", currentUser?.points);
},[currentUser]);




  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Informacion de Perfil ✌️</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
          {currentUser?.user?.username} <Link color={"blue.400"}> 🐕‍🦺 </Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="email">
                <FormLabel>Correo</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>Nombre</FormLabel>
                <Input type="text" onChange={formik.handleChange} value={formik.values.firstName}/>
                </FormControl>

              <FormControl id="lastName">
                <FormLabel>Apellidos</FormLabel>
                <Input type="text" onChange={formik.handleChange} value={formik.values.lastName} />
              </FormControl>

              <FormControl id="phone">
                <FormLabel>Teléfono móvil </FormLabel>
                <Input type="text" onChange={formik.handleChange} value={formik.values.phone} />
              </FormControl>

              <FormControl id="gender">
                <FormLabel>Género </FormLabel>
              <Select placeholder='Seleccione el genero'
              onChange={formik.handleChange} value={formik.values.gender}>
                <option value='m'>Masculino</option>
                <option value='f'>Femenino</option>
                <option value='optioon3'>Otro</option>
              </Select>
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
                  Guardar Cambios
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
