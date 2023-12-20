import React, { useEffect, useState } from 'react'
import Navbar from './Navbar1';
import Footer from './Footer';
import ConsumerSidebar from './ConsumerSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import UpdateUser from '../updateUser/updateUser';
import { setUser } from '../../reducers/userReducer';
import Cookies from "js-cookie";
import ChangePassword from '../changePassword/ChangePassword';
import Login from '../login/Login';

const Profile = () => {
        const [currentStep,setCurrentStep] = useState(1);
        const dispatch = useDispatch();
        const [open, setOpen] = useState(false);

        // const dispatch = useDispatch();
        const history = useNavigate();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
      
        const navigate = useNavigate();

        useEffect(() => {
          const user = {
            fullname: Cookies.get('fullname'),
            email: Cookies.get('email'),
            mobileno: Cookies.get('mobileno'),
            profileImg: Cookies.get('profileImg'),
            role: Cookies.get('role'),
            token: Cookies.get('token'),
          };
        
          if (user.fullname && user.email && user.mobileno) {
            dispatch(setUser(user));
          }
        }, []);
        const user = useSelector((state) => state.user.user);

  return (
    <div>
        <Navbar open={open} />
        <ConsumerSidebar user={user} open={open} setOpen={setOpen} setCurrentStep={setCurrentStep} currentStep={currentStep} />
        {currentStep == 1 &&
           <TableContainer style={{ width:'50%', margin:'auto'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell >FullName</TableCell>
            <TableCell align="center">{user?.fullname}</TableCell>
            
          </TableRow>
          <TableRow>
            <TableCell>Mobile No</TableCell>
            <TableCell align="center">{user?.mobileno}</TableCell>
            
          </TableRow>
          <TableRow>
            <TableCell>Email Address</TableCell>
            <TableCell align="center">{user?.email}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">{user.user.name}</TableCell>
            
          </TableRow> */}
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>

        }
        {currentStep == 2 &&
          <UpdateUser />

        }
        {currentStep == 3 &&
          <ChangePassword />

        }
        {currentStep == 4 &&
          <Login />

        }
        <Footer position={''} />
    </div>
  )
}

export default Profile
