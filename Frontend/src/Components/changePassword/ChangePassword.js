import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import Cookies from "js-cookie";

import "./ChangePassword.css"; // Make sure to adjust the import path for your CSS file
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

const ChangePassword = () => {
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("profileImg", file);
  };
  const [error,setError] = useState();
  const token = Cookies.get('token')
  const navigate = useNavigate();
  const [message,setMessage] = useState(null)
  const handleSubmit = async (values) => {
    try {
      const data = {
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      }

      const response = await axios.post("http://localhost:5000/api/user/update-password",data , {
        headers: { "Content-Type": "application/json" , Authorization:`Bearer ${token}`},
      });

      if(response.status) {
        setMessage('Password Updated!')
      }
      // Handle success, redirect, or show a success message
      console.log("User registered successfully!");
    } catch (error) {
      // Handle errors
     
      setError(error?.response?.data?.message);
      console.log(error)
      console.error("Error during registration:", error.message);
    }
  };


  return (
    <div className="consumer-signup">
      {error && <StyledAlert  severity="error">{error}</StyledAlert>}
      {message && <StyledAlert severity="success">{'Successfully Updated!'}</StyledAlert>

      }
      <div className="signup-container">

        <h2>Change Password</h2>
        <Formik
          initialValues={{
           newPassword:"",
           confirmPassword:""
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="input-group">
                <Field type="text" name="newPassword" placeholder={'Password'} />
              </div>
              <div className="input-group">
                <Field type="text" name="confirmPassword" placeholder={'ConfirmPassword'} />
              </div>
             
             

              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
