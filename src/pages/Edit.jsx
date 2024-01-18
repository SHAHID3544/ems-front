import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Loadingspinner from '../components/Loadingspinner';
import {  allUsers, editUser } from '../services/allApi';
import { registerContext } from './Contextshare';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';




function Edit() {


  const{registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'NonActive', label: 'NonActive' },
  
    
  ];

  const[showspin,setshowspin]=useState(true)

  // to hold normal user input

  const[normalInput,setNormalUserInput]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // to hold status

  const[status,setStatus]=useState("")
  const[profile,setProfile]=useState("")

  const[preview,setPreview]=useState("")



  useEffect(() => {

    if(profile){
      setexistingImage("")
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(()=>{
      setshowspin(false)
    },2000)
    
  
    
  }, [profile])

  // to get single item for edit

  const {id}=useParams()
  console.log(id);

  const[existingImage,setexistingImage]=useState("")

  useEffect(() => {
    getUser()
  }, [])
  

  // to get all employee details from database

  const getUser=async()=>{
    const{data}=await allUsers("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    // console.log(existingUser);
    setNormalUserInput(existingUser)
    setStatus(existingUser.status)
    setexistingImage(existingUser.profile)
  }

  

  // define normaluser input function

  const getandsetuserNormalinputs=(e)=>{
    const{name,value}=e.target
    setNormalUserInput({...normalInput,[name]:value})
    
  }
  
  const handleFile=(e)=>{
    setProfile(e.target.files[0]);
  }

  // console.log(normalInput);
  // console.log(status);
  // console.log(profile);

  

  

  // define submit function

  const handleSubmit= async(e)=>{
    e.preventDefault()

    const{fname,lname,email,mobile,gender,location}=normalInput

    if(!fname||!lname||!email||!mobile||!gender||!status||!profile||!location) {

      alert('please fill the form completely')

    }
    else{
      // alert('form filled completely')

      const data=new FormData()

      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      profile?data.append("profile",profile):data.append("profile",existingImage)
      data.append("location",location)


      if(profile){


     var headers={
        "content-type":"multipart/form-data"

     }
     
      }else{
        var headers=""
      }

      

      // api call

    const response= await  editUser(id,data,headers)
    console.log(response);

    if(response.status==200){
      

      
      navigate('/')
      
    }
    else{
      alert('request failed')
    }
    }
    
  }


  return (
    <>

{
  showspin?
  <Loadingspinner/>:
    <div className='container mt-3'>
      <h1 className='text-center fw-bolder'>Update Employee Details</h1>

      <div className='mt-3 shadow border-rounded p-2'>

        <div className='text-center'>
          <img style={{width:'50px',borderRadius:'50%'}} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" />



        </div>

        <Form className='mt-3'>
          <Row>
            {/* first name */}

          <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='fname'  placeholder="First Name" value={normalInput.fname} />
      </FloatingLabel>

      {/* last name */}

      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='lname' placeholder="Last Name" value={normalInput.lname} />
      </FloatingLabel>

      {/* email */}

      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
        <Form.Control type="email" onChange={e=>getandsetuserNormalinputs(e)} name='email' placeholder="Email" value={normalInput.email} />
      </FloatingLabel>


      {/* mobile*/}


      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='mobile' placeholder="Mobile" value={normalInput.mobile} />
      </FloatingLabel>

      {/* gender */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Select Gender</Form.Label>
        <Form.Check type={"radio"} onChange={e=>getandsetuserNormalinputs(e)} name='gender' value={'male'} label={"Male"}  checked={normalInput.gender==="male"?true:false}/>
        <Form.Check type={"radio"} onChange={e=>getandsetuserNormalinputs(e)} name='gender' value={'Female'} label={"Female"} checked={normalInput.gender==="Female"?true:false} />

      </Form.Group>

      {/* status */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Select Employee Status</Form.Label>
        <Select placeholder={status} onChange={e=>setStatus(e.value)} options={options}/>
        

      </Form.Group>

      {/* file upload */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Choose Profile Picture</Form.Label>
        
        <Form.Control type="file" onChange={e=>handleFile(e)} name='profile' />

      </Form.Group>

      {/* location */}

      <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatingInputlocation" label="Location">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='location' placeholder="Location" value={normalInput.location} />
      </FloatingLabel>


      <Button onClick={e=>handleSubmit(e)} type='submit' variant='primary'>Submit</Button>


          </Row>

      
        </Form>

      </div>
    </div>
}



   
    </>
  )
}

export default Edit