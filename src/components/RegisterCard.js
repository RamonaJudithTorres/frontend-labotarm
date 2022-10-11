import React, { useEffect } from "react";
import { formik, useField, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitialize, register } from "../redux/authSlice";
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

export default function RegisterSimpleCard() {
  const dispatch = useDispatch();
  const { isLogin, currentUser, isNewUser } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    password_confirm: '',
    firstName: '',
    lastName: '',
    username: '',
  };
  const onSubmit = (values) => {
    dispatch(
      register({
        user_email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        password_confirm: values.password_confirm,
        user: values.username,
      })
    );
  };

  const formik = useFormik({ initialValues, onSubmit });

  useEffect(() => {
    if (isLogin && currentUser) {
      navigate("/");
    } else if (isNewUser && currentUser) {
      alert("revisa tu bandeja de email");
    } else {
      dispatch(getInitialize());
    }
  }, [isLogin, currentUser, isNewUser]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Completa tus datos</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Para comenzar <Link color={"blue.400"}> ✌️ </Link>
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
              <FormControl id="username">
                <FormLabel>Usuario</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </FormControl>
              <FormControl id="firstName">
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Apellidos</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Constraseña</FormLabel>
                <Input
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <FormControl id="password_confirm">
                <FormLabel>Confirmar Constraseña</FormLabel>
                <Input
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password_confirm}
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Registrarse
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
