// App.js
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Homepage from './Components/home/Homepage';
import ConsumerDashboard from './Components/consumerDashboard/consumerHomePage/ConsumerDashboard';
import AboutUs from "./Components/consumerDashboard/aboutus/AboutUs";
import FAQ from "./Components/consumerDashboard/support/FAQ";
import Complaint from "./Components/consumerDashboard/support/Complaint";
import Blogs from "./Components/consumerDashboard/blogs/Blogs";
import Sessions from "./Components/consumerDashboard/onlineSessions/OnlineSessions";
import BackToTopButton from './Components/BackToTopButton';
import Login from './Components/login/Login';
import ConsumerSignup from './Components/signup/ConsumerSignup';
import Blog1 from './Components/consumerDashboard/blogs/Blog1';
import Blog2 from './Components/consumerDashboard/blogs/Blog2';
import Blog3 from './Components/consumerDashboard/blogs/Blog3';
import Blog4 from './Components/consumerDashboard/blogs/Blog4';
import Blog5 from './Components/consumerDashboard/blogs/Blog5';
import Blog6 from './Components/consumerDashboard/blogs/Blog6';
import Blog7 from './Components/consumerDashboard/blogs/Blog7';

import GovtDashboard from './Components/govtDashboard/GovtDashboard';

import ConsumerDetails from './Components/JalNigmDashboard/ConsumerDetails';
import ConsumerBilling from './Components/JalNigmDashboard/ConsumerBilling';
import GISMapping from './Components/govtDashboard/GISMapping';
import FeedbackForm from './Components/consumerDashboard/support/FeedbackForm';

function App() {
  return (
        <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/consumerDashboard" element={<ConsumerDashboard />} />
            <Route path="/GovtDashboard" element={<GovtDashboard />} />
            <Route path="/gISMapping" element={<GISMapping />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/ConsumerSignup" element={<ConsumerSignup />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/blogs" element={<Blogs/>}/>
            <Route exact path="/blog1" element={<Blog1/>}/>
            <Route exact path="/blog2" element={<Blog2/>}/>
            <Route exact path="/blog3" element={<Blog3/>}/>
            <Route exact path="/blog4" element={<Blog4/>}/>
            <Route exact path="/blog5" element={<Blog5/>}/>
            <Route exact path="/blog6" element={<Blog6/>}/>
            <Route exact path="/blog7" element={<Blog7/>}/>
            <Route exact path="/sessions" element={<Sessions/>} />
            <Route exact path="/faqs" element={<FAQ/>} />
            <Route exact path="/complaint" element={<Complaint/>} />
            <Route exact path="/feedback" element={<FeedbackForm/>} />

            <Route exact path="/jalnigamDashboard" element={<ConsumerDetails/>} />
            <Route exact path="/consumerBilling" element={<ConsumerBilling/>} />
          </Routes>
          <BackToTopButton/>
        </Router>

      </div>




    
  );
}

export default App;