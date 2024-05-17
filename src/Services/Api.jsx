import axios from 'axios';

const API_BASE_URL = 'http://18.61.185.240:8082';

const Api = axios.create({
  baseURL: API_BASE_URL,
});

const getJwtToken = () => {
  return localStorage.getItem('jwtToken')
  // Replace 'yourJwtTokenKey' with the actual key you used for storing the JWT token
};

const getApiHeaders = () => {
  const jwtToken = getJwtToken();
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

export const getProfiles = (email) => {
  const headers = getApiHeaders(); // Dynamically get headers when making the request
  return Api.get(`/reg?email=${email}`, headers);
};


export const getProfessional = (regno) => {
  // Include the JWT token in the request headers
  const headers = getApiHeaders();
  return Api.get(`/viewprofessional?regno=${regno}`,headers);
};

export const geAdminProfiles = (email) => {
  const headers = getApiHeaders();
  return Api.get(`/adminreg?email=${email}`, headers)
}
export const getViewAddmore = (email) => {
  const headers = getApiHeaders();
  return Api.get(`/useruniquereq?email=${email}`, headers)
}

export const getUserView = () => {
  const headers = getApiHeaders();
  return Api.get(`/userreq`,headers)
}


export const postAdminChangeOtp = (otp) => {
 
  return Api.post(`/adminotp5?otp=${otp}`)
}
export const postUserChangeOtp = (otp) => {
  
  return Api.post(`/otp5?otp=${otp}`)
}
export const postApplicationDetails = (formdata) => {
  const headers = getApiHeaders();
  return Api.post("/prosave",formdata,headers)
}
export const postAdminForgetPassword = (data) => {
  
  return Api.post("/adminchangepassword",data)
}
export const postAdminLogin = (data) => {
 
  return Api.post("/authenticate1",data)
}

export const postUserLogin = (data) => {
  
  return Api.post("/authenticate",data)
}
export const postAdminOtp = (otp) => {
  
  return Api.post(`/adminotp1?otp=${otp}`)
}
export const postUserOtp = (otp) => {
  
  return Api.post(`/otp1?otp=${otp}`)
}
export const putAdminPasswordChange = (data) => {
  
  return Api.put("/adminchangepassword1",data)
}
export const postAdminRegister = (data) => {
  
  return Api.post("/adminsave",data)
}
export const postUserAddmore = (data1) => {
  const headers = getApiHeaders();
  return Api.post("/persave",data1,headers)
}
export const putUserAddmore = (data1) => {
  const headers = getApiHeaders();
  return Api.put("/updateDetails",data1,headers)
}

export const postUserForgetPassword = (data) => {
  
  return Api.post("/changepassword",data)
}

export const postChangeUserPasswordByEmail = (data) => {
  
  return Api.put("/changepassword1",data)
}

export const deleteUserById = (regno) => {
  const headers = getApiHeaders();
  return Api.delete(`/deleteappli?regno=${regno}`,headers)
}
export const deleteSuperById = (id) => {
 
  return Api.delete(`/superdelete?id=${id}`)
}
export const getSearchQuery = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(`/search?query=${searchQuery}`,headers)
}
export const getAdminSearchQuery = (searchQuery) => {
 
  return Api.get(`/adminsearch?query=${searchQuery}`)
}
export const AdminRegister = (data) => {
 
  return Api.post("/adminregister",data)
}
export const UserRegister = (data) => {
  
  return Api.post("/register",data)
}
export const UserRegisterSuccess = (data) => {
  
  return Api.post("/save",data)
}

export const putUserEditDetailsUpdate = (formdata) => {
  const headers = getApiHeaders();
  return Api.put("/usereditupdate",formdata,headers)
}


export const viewAllUserReg=()=>{
  return Api.get("/alluserregisters");
}
export const viewAllAdminReg=()=>{
  return Api.get("/alladminregisters");
}
export const deleteUserReg=(email)=>{
return Api.delete(`/deleteuserreg?email=${email}`,email);
}
export const deleteAdminReg=(email)=>{
  return Api.delete(`/deleteadminreg?email=${email}`,email);
  }
  export const addJobid = (data) => {
    const headers = getApiHeaders();
    return Api.post(`/addjobid`,data,headers)
  }
  export const deleteJobid = (id) => {
    const headers = getApiHeaders();
    return Api.delete(`/deletejobid?id=${id}`,headers)
  }

  export const getJobid = () => {
    const headers = getApiHeaders();
    return Api.get(`/getjobid`,headers)
  }
  export const getAllReisters=()=>{
    return Api.get("/getallreg")
  }
  export const getAllAdminReisters=()=>{
    return Api.get("/getalladminreg")
  }
