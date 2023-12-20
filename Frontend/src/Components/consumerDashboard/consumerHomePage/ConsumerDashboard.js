import VideoSection from "./VideoSection";
import Navbar1 from "../Navbar1";
import Footer from "../Footer";
import ProjectOverview from "../../home/ProjectOverview";
import HomePage3 from "../../home/HomePage3";
import WorkingProcess from "../aboutus/WorkingProcess";
import Gallery from "../../home/Gallery";
import Chatbot from "./Chatbot";
// import New from "./New";
import ChatPage from "./ChatPage";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/userReducer";

function ConsumerDashboard() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = {}
     user.fullname = Cookies.get('fullname');
     user.email = Cookies.get('email');
     user.mobileno = Cookies.get('mobileno');
     user.profileImg = Cookies.get('profileImg');
     user.role = Cookies.get('role');
     user.token = Cookies.get('token');
    if(user) {
      dispatch(setUser(user));
    }

  },[])
  return (
    <div className="home">
      <Navbar1/>
      <VideoSection/>
      <ProjectOverview/>
      <HomePage3/>
      <WorkingProcess/>
      <Gallery/>
      {/* <Chatbot/> */}
      {/* <ChatPage/> */}
      <Footer/>
    </div>
  );
}

export default ConsumerDashboard;