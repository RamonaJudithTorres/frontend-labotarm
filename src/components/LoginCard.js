import React, { useEffect } from "react";
import { formik, useField, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, getInitialize } from "../redux/authSlice";
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

export default function SimpleCard() {
  const dispatch = useDispatch();
  const { isLogin, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const onSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const formik = useFormik({ initialValues, onSubmit });

  useEffect(()=>{
    if(isLogin && currentUser){navigate('/');
  }else {
    dispatch(getInitialize());
  }
},
  [isLogin,currentUser]
  )
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>

            <form onSubmit={formik.handleSubmit} >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="text" onChange={formik.handleChange} value={formik.values.email} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={formik.handleChange} value={formik.values.password} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",}} >
                Sign in
              </Button>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
