import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import "./ConsumerSignup.css"; 
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
} from "react-icons/ai";
import { Alert,styled } from "@mui/material";

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginTop: '23px !important',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  margin: 'auto'
}))

const ConsumerSignup = () => {
 
  const [error,setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("mobileno", values.mobileno);
    

      const response = await axios.post("http://localhost:5000/api/user/Register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      console.log("asdfghjkl",response);
      console.log("User registered successfully!");
      navigate('/Login');
    } catch (error) {

      // Handle errors
     
      setError(error?.response?.data?.message);
      console.log(error)
      console.error("Error during registration:", error.message);
    }
  };


  return (
    <div className="consumer-signup">
      <Navbar />
      {error && <StyledAlert  severity="error">{error}</StyledAlert>}
      <div className="signup-container">

        <h2>Create An Account</h2>
        <p>Securely signup to your account</p>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            mobileno: "",
            // profileImg: null,
            role:""
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="input-group">
                <AiOutlineUser className="input-icon" />
                <Field type="text" name="fullName" />
              </div>
              <div className="input-group">
                <AiOutlineMail className="input-icon" />
                <Field type="email" name="email" />
              </div>

              <div className="input-group">
                <AiOutlineLock className="input-icon" />
                <Field type="password" name="password" />
              </div>
              <div className="input-group">
                <AiOutlinePhone className="input-icon" />
                <Field type="text" name="mobileno" />
              </div>
              {/* <div className="input-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
              </div> */}

              <div>
                <button type="submit">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="login-link">
          <p>
            Already have an account?<Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsumerSignup;



