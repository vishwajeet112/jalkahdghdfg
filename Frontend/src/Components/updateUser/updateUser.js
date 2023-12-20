import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import "./updateUser.css"; // Make sure to adjust the import path for your CSS file
import Cookies from "js-cookie";
import { setUser } from '../../reducers/userReducer';
import { useDispatch } from "react-redux";
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

const UpdateUser = () => {
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("profileImg", file);
  };
  const dispatch = useDispatch();
  const token = Cookies.get('token')
  const [error,setError] = useState();
  const navigate = useNavigate();
  const [message,setMessage] = useState('')
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      if(values.fullName) {
      formData.append("fullname", values.fullName);
        
      }
      if(values.email) {
      formData.append("email", values.email);

      }
      if(values.mobileno) {
      formData.append("mobileno", values.mobileno);

      }
      if(values.profileImg) {
      formData.append("profileImg", values.profileImg);

      }

      const response = await axios.post("http://localhost:5000/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization:`Bearer ${token}` },
      });

      setMessage('Consumer Details Successfully Updated!')
      if(response.status) {
        const user = {}
           user.fullname = response.data.data.fullname;
           user.profileImg = response.data.data.profileImg;
           user.mobileno = response.data.data.mobileno;
           user.email = response.data.data.email;
           user.role = response.data.data.role;
          
           dispatch(setUser(user));

        Cookies.set('fullname', response.data.data.fullname, { expires: 30 });
        Cookies.set('profileImg', response.data.data.profileImg, { expires: 30 });
        Cookies.set('mobileno', response.data.data.mobileno, { expires: 30 });
        Cookies.set('email', response.data.data.email, { expires: 30 });
        Cookies.set('role', response.data.data.role, { expires: 30 });
      }

      console.log(response);

      // Handle success, redirect, or show a success message
      console.log("User registered successfully!");
    //   navigate('/Login');
    } catch (error) {
      // Handle errors
     
      setError(error?.response?.data?.message);
      console.log(error)
      console.error("Error during update:", error.message);
    }
  };


  return (
    <div className="consumer-signup">
      {error && <StyledAlert  severity="error">{error}</StyledAlert>}
      {message && <StyledAlert severity="success">{message}</StyledAlert>

      }
      <div className="signup-container">

        <h2>Update User Details</h2>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            mobileno: "",
            profileImg: null,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="input-group">
                <AiOutlineUser className="input-icon" />
                <Field type="text" name="fullName" placeholder={'FullName'} />
              </div>
              <div className="input-group">
                <AiOutlineMail className="input-icon" />
                <Field type="email" name="email" placeholder={'email'} />
              </div>
              <div className="input-group">
                <AiOutlinePhone className="input-icon" />
                <Field type="text" name="mobileno" placeholder={'mobileno'} />
              </div>
              <div className="input-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
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

export default UpdateUser;
