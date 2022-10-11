import React, {useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from 'axios';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const VerifyUser = () => {
  const [userVerify, setUserVerify] =useState(false);
  const navigate = useNavigate();

  const notify = () => toast.success("Usuario verificado con éxito!");
  const notifyErr = () => toast.error("Error al registrar");

  useEffect(() => {
    setTimeout(()=>{
      if(userVerify){
        navigate("/login");
      }
    },3000)
  }, [navigate, userVerify])

const validateAccount = () =>{
  let query = queryString.parse(window.location.search.substring(1));
  let user_id= query.user_id;
  let timestamp = query.timestamp;
  let signature = query.signature;

    axios.post('http://127.0.0.1:8000/accounts/verify-registration/',
    { user_id,
    timestamp,
    signature
    }).then( response=>{ if (response.data.detail === "User verified successfully"){
      notify();
      setUserVerify(true);

    }}).catch(err => { notifyErr()});
}


  return (
    <div className="App">
      <Header></Header>
      <main>
      <Box w="100%" p={6}>
      <br/>
  <Button onClick={validateAccount} variant="outline" bg="blue.900" color={'green.50'}  p={4}>Activar cuenta</Button>
</Box>
      </main>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};
export default VerifyUser;