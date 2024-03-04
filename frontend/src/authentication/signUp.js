import { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const errorField={
  borderStyle: "solid",
  borderColor: "#D93025"
}

const SignUp=()=>{
  const context=useContext(AuthContext);
  const [fName,setFname]=useState("");
  const [lName,setLname]=useState("");
  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [conPass,setConPass]=useState("");
  const type = "user";
  const [error,setError]=useState([]);
  const [fieldError,setFieldError]=useState([]);
  
  const navigate=useNavigate();
    const handleSubmission= async (e)=>{
        e.preventDefault();
        const signUpData={fName,lName,userName,email,pass,conPass,type}
        const request=await fetch('/signup',{
        method:'POST',
        body:JSON.stringify(signUpData),
        headers:{
        'Content-Type':'application/json'
        }
    })
    const response = await request.json();

      if(!response.msg)
      {
      setError("");
      setFieldError([]);
      //console.log(response);
      //localStorage.setItem('user',JSON.stringify(response));
      context.dispatch({type:'login',payload:response})
      //navigate('/');
      }
      else{
        setError(response);
        if(response.invalidFields)
        setFieldError(response.invalidFields);
        else
        setFieldError(response.emptyFields);
      console.log(response);
    }
    }
    return (
    <div style={{backgroundColor:'#f1f1f1',height:'100vh'}}>
        <div className="container d-flex justify-content-center" style={{backgroundColor:'#f1f1f1'}}>
        <form onSubmit={handleSubmission}>
        <div className='row pt-5 d-flex justify-content-center' style={{backgroundColor:'white',width:'700px',marginTop:'100px'}}>
        <h2 className="col-10 pb-4" style={{fontSize:"36px"}}><b>Create an account</b></h2>
        <div className="form-floating col-5 mb-5">
        <input 
        type="text" 
        className="form-control ps-3" 
        placeholder=""
        value={fName}
        style={fieldError.includes('fName')?errorField:{}}
        onChange={e=>setFname(e.target.value)}  
        ></input>
        <label className="ms-3" style={fieldError.includes('fName')?{color:'#D93025'}:{}}>First Name</label>
        </div>
        <div className="form-floating col-5 mb-5">
        <input 
        type="text" 
        className="form-control ps-3" 
        placeholder="" 
        value={lName}
        style={fieldError.includes("lName")?errorField:{}}
        onChange={e=>setLname(e.target.value)}
        ></input>
        <label className="ms-3" style={fieldError.includes('lName')?{color:'#D93025'}:{}}>Last Name</label>
        </div>
        <div className="form-floating col-10 mb-5">
        <input 
        type="text" 
        className="form-control ps-3" 
        placeholder=""
        value={userName}
        style={fieldError.includes('userName')?errorField:{}}
        onChange={e=>setUserName(e.target.value)}
        ></input>
        <label className="ms-3" style={fieldError.includes('userName')?{color:'#D93025'}:{}}>Enter a username</label>
        </div>
        <div className="form-floating col-10 mb-5">
        <input 
        type="text" 
        className="form-control ps-3" 
        placeholder="" 
        value={email}
        style={fieldError.includes('email')?errorField:{}}
        onChange={e=>setEmail(e.target.value)}
        ></input>
        <label className="ms-3" style={fieldError.includes('email')?{color:'#D93025'}:{}}>Enter your email address</label>
        </div>
        <div className="form-floating col-10 mb-5">
        <input 
        type="text" 
        className="form-control ps-3" 
        placeholder="" 
        value={pass}
        style={fieldError.includes('pass')?errorField:{}}
        onChange={e=>setPass(e.target.value)}
        ></input>
        <label className="ms-3" style={fieldError.includes('pass')?{color:'#D93025'}:{}}>Enter a password</label>
        </div>
        <div className="form-floating col-10">
        <input 
        type="text" 
        className="form-control ps-3"
         placeholder=""
         value={conPass}
         style={fieldError.includes('conPass')?errorField:{}}
         onChange={e=>setConPass(e.target.value)}
         ></input>
        <label className="ms-3" style={fieldError.includes('conPass')?{color:'#D93025'}:{}}>Confirm the password</label>
        </div>
        <div className="col-10 mt-3">
        {error&&
        <div className="ps-2" style={{height:'40px',color:'#D93025'}}>
        {error.msg}
        </div>}
        </div>
        <div className="col-10 pt-3 pb-5 d-flex justify-content-end" style={{paddingRight:'10px'}}>
        <button 
        type='submit'
        className="btn btn-outline-primary px-3 py-2"><b>Confirm</b></button>
        </div>
        </div>

        </form>
      </div>
    </div>
    )
}
export default SignUp;