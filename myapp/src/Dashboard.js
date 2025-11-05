import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Products from "./Products";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
    const[Languages,setLanguages]=useState([]);
    const fetchLanguages=async()=>{
            const request=await fetch('http://localhost:8000/languages',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const response=await request.json();
            console.log(response);
            setLanguages(response);
        }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/";
        }
    fetchLanguages();
    },[])
    
    
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="navbar">
            <div className="usernav">
              <div>
                <AccountCircleIcon style={{ color: "white",fontSize:"45px" }} />
              </div>
              <div>
                <p style={{ fontFamily: "sans-serif", color: "white",fontSize:"18px",marginTop:"5px" }}>John Andre<span style={{ fontFamily: "sans-serif", color: "white",fontSize:"7px",display:"block" }}>Stanford US</span></p>
                
              </div>
            </div>
            <div className="language">
                <label htmlFor="language-select" style={{ color: "white", fontFamily: "sans-serif", marginRight: "10px" }}>Language:</label>
                <select className="languageselect">
                    {Languages.map((lang)=>(
                        <option key={lang.id} value={lang.id}>{lang.language}</option>
                    ))}
                </select>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="productdisplay">
        <Products/>
      </div>
      
    </>
  );
};

export default Dashboard;
