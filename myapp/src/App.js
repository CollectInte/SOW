import React from 'react';
import './App.css';

function App() {
  const[username,setUsername]=React.useState("");
  const[password,setPassword]=React.useState("");

  const Login=async()=>{
    if(username === "" || password === "") {
      alert("Please enter both username and password.");
      return;
    }else{
      const request= await fetch('http://localhost:8000/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,password})
      });
      const response=await request.json();
      if(request.status===200){
        alert("Login Successful");
        localStorage.setItem("token",response.token);
      }else{
        alert(response.message || "Login Failed");
      }
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className='heading'>Login</h1>
        </div>
        <div className="col-12 mx-auto text-center">
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="usernameinput"/>
          <br/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="passwordinput"/>
          <br/>
          <button className="loginbutton" onClick={Login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
