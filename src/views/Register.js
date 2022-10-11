import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterSimpleCard from "../components/RegisterCard";

const Register = () => {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <RegisterSimpleCard/>
      </main>
      <Footer></Footer>
    </div>
  );
};
export default Register;
