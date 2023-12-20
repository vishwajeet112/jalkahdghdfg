import React , { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineGoogle, AiOutlineFacebook, AiOutlineUser } from 'react-icons/ai';
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "../login/Login.css"
import Navbar from "../home/Navbar"
import Footer from "../home/Footer"

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../reducers/userReducer";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    console.log(email, password)
    try {
      await axios
        .post("http://localhost:5000/api/user/Login", {
          email,
          password,
        })
        .then((res) => {
          console.log("res", res)
          
          if(res.status){
            console.log(dispatch)
            Cookies.set('fullname', res.data.data.fullname, { expires: 30 });
            Cookies.set('profileImg', res.data.data.profileImg, { expires: 30 });
            Cookies.set('mobileno', res.data.data.mobileno, { expires: 30 });
            Cookies.set('token', res.data.data.token, { expires: 30 });
            Cookies.set('email', res.data.data.email, { expires: 30 });
            Cookies.set('role', res.data.data.role, { expires: 30 });

            dispatch(setUser(res.data.data));
            // navigate('/profile')
            const userRole = res.data.data.role;
            console.log(res.data);
            console.log('User Role:', userRole);
            // navigate('/ConsumerDashboard');

            if (userRole === 'consumer') {
              navigate('/consumerDashboard'); // Change this to the user route
            }
            else if (userRole === 'jalnigam') {
              navigate('/jalnigamDashboard'); // Change this to the admin route
            }
            else if (userRole === 'govt') {
              navigate('/GovtDashboard'); // Change this to the admin route
            }
            else {
              // Handle other roles or redirect to a default route
              console.error('Unknown user role:', userRole);
              navigate('/Login');
            }

          }

          // if (res.data === "notexist") {
          //   history("/login", { state: { id: email } });
          //   alert("Account Created successfully Please Login To Continue")
          // }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className='consumer-login'>
        <Navbar/>
        <div className="login-container">
      <h2>Login</h2>
      <p>Securely login to your account</p>
      <form>
          <div className="input-group">
          <AiOutlineMail className="input-icon" />
          <input type="email" placeholder="Email" onChange={(e) => {
                setEmail(e.target.value);
              }}/>
          </div>
          <div className="input-group">
            <AiOutlineLock className="input-icon" />
            <input type="password" placeholder="Enter Password" onChange={(e) => {
                setPassword(e.target.value);
              }}/>
          </div>
        <button type="submit" onClick={submit}>Login</button>
      </form>
      <div className="options">
        <a href="#">Forgot Password?</a>
        {/* <div className="or-divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>
        <div className='others'>
        <button className="google-login">
          <AiOutlineGoogle className="google-icon" />
          Login with Google
        </button>
        <button className="google-login">
          <AiOutlineFacebook className="google-icon" />
          Login with Facebook
        </button>
        </div> */}
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default Login;
