import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import View from "../components/View";
import Profile from "../components/Profile";
function Dashboard() {
  const [username,setUserName]=useState("");
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const {username} = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserName(username);
    }else{
      setUserName("user")
    }
  },[])
  return (
    <div className="mb-5">
      <Header insideDashboard={true} />
      <div className="container-fluid mt-5">
        <div className="row mt-5">
          <div className="col-lg-8">
            <h1>
              Welcome <span className="text-warning">{username?.split(" ")[0]}</span>
            </h1>
            <View />
          </div>
          <div className="col-lg-4">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
