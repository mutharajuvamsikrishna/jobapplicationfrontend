import React from "react";
import "./App.css";

import Onielogo from "./Onielogo";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./register";
import PersonalApplication from "./PersonalApplication";
import Otp from "./Otp";
import Regsucess from "./Regsucess";
import Registersave from "./Registersave";
import Invalidotp from "./Invalidotp";
import Login from "./Login";
import Forgetpassword from "./Forgetpassword";
import Invalidcredits from "./Invalidcredits";
import ChangeOtp from "./Changeotp";
import Forgetpassword1 from "./Forgetpassword1";
import Application from "./Application";
import Sucess from "./Success";
import ViewProApplication from "./ViewProApplication";
import EditProfessional from "./EditProfessional";
import ViewPersonal from "./ViewPersonal";
import EditPersonal from "./EditPersonal";
import TagRegister from "./TagRegister";
import AdminOtp from "./AdminOtp";
import AdminRegistersave from "./AdminRegistersave";
import ManageOnieJob from "./ManageOnieJob";
import AdminLogin from "./AdminLogin";
import AdminForgetPassword from "./AdminForgetPassword";
import AdminForgetPasswordOtp from "./AdminChangeOtp";
import AdminPasswordmsg from "./AdminPasswordmsg";
import AdminPasswordChange from "./AdminPasswordChange";
import ViewAlldetails from "./ViewAlldetails";
import AdminEdit from "./AdminEdit";
import Piechart from "./PieChart";
import Regsucess1 from "./Regsucess1";
import Profile from "./Profile";
import ChangePassSuccess from "./ChangePassSuccess";
import AdminPersonalView from "./AdminPersonalView";
import UserPersonalEdit from "./UserPersonalEdit";
import AdminProfile from "./AdminProfile";
import AdminRegfail from "./Adminregfail";
import AdminLoginInvalid from "./AdminLoginInvalid";
import UserPersonalView from "./UserPersonalView";
import UserOauth from "./UserOauth";
function App() {
  return (
    <div className="maincontainer">
      <Router>
        <Onielogo />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/regsucess" element={<Regsucess />} />
          <Route path="/regsucess1" element={<Regsucess1 />} />
          <Route path="/regsavesucess" element={<Registersave />} />
          <Route path="/invalidotp" element={<Invalidotp />} />
        
          <Route path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/invalidcredits" element={<Invalidcredits />} />
          <Route path="/changepassword" element={<ChangeOtp />} />
          <Route path="/changepassword1" element={<Forgetpassword1 />} />
          <Route path="/changepasswordsucess" element={<ChangePassSuccess />} />
          <Route path="/application" element={<Application />} />
         
          <Route path="/success" element={<Sucess />} />
          <Route path="/viewapplication" element={<ViewProApplication />} />
          <Route path="/editprofessional" element={<EditProfessional />} />
          <Route path="/viewpersonal" element={<ViewPersonal />} />
          <Route path="/editpersonal" element={<EditPersonal />} />
          <Route path="/adminregfail" element={<AdminRegfail />} />
          <Route path="/admin" element={<TagRegister />} />
          <Route path="/adminotp" element={<AdminOtp />} />
          <Route path="/adminregsucess" element={<AdminRegistersave />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/adminforgetpassword"
            element={<AdminForgetPassword />}
          />
          <Route
            path="/adminchangepassword"
            element={<AdminForgetPasswordOtp />}
          />
          <Route
            path="/adminchangepassword1"
            element={<AdminPasswordChange />}
          />
          <Route
            path="/personalapplication"
            element={<PersonalApplication />}
          />
          <Route path="/adminsuccess" element={<AdminPasswordmsg />} />
          <Route path="/viewalldetails" element={<ViewAlldetails />} />
          <Route path="/adminedit" element={<AdminEdit />} />
          <Route path="/piechart" element={<Piechart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminpersonaledit" element={<AdminPersonalView />} />
          <Route path="/personaledit" element={<UserPersonalEdit />} />
          <Route path="/loginfail" element={<AdminLoginInvalid />} />
          <Route path="/managejobid" element={<ManageOnieJob />} />
          <Route path="/personalview" element={<UserPersonalView />} />
          <Route path="/useroauth" element={<UserOauth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
