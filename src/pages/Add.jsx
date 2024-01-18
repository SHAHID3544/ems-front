import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import Loadingspinner from '../components/Loadingspinner';
import { addUser } from '../services/allApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';



function Add() {

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

  

  useEffect(() => {

    if(profile){
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(()=>{
      setshowspin(false)
    },2000)
    
  
    
  }, [profile])

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
      data.append("profile",profile)
      data.append("location",location)

      const headers={
        "content-type":"multipart/form-data"
      }

      // api call

    const response= await  addUser(data,headers)
    console.log(response);

    if(response.status==200){
      setNormalUserInput({...normalInput,
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        gender:"",
        location:""
      })

      setStatus("")
      setProfile("")
      setregisterData(response.data)
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
      <h1 className='text-center fw-bolder'>Add New Employee Details</h1>

      <div className='mt-3 shadow border-rounded p-2'>

        <div className='text-center'>
          <img style={{width:'50px',borderRadius:'50%'}} src={preview?preview:" https://icon2.cleanpng.com/20180523/wxj/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc2ee812.2252011515270566041921.jpg"} alt="no image" />



        </div>

        <Form className='mt-3'>
          <Row>
            {/* first name */}

          <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='fname'  placeholder="First Name" value={normalInput.value} />
      </FloatingLabel>

      {/* last name */}

      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='lname' placeholder="Last Name" value={normalInput.value} />
      </FloatingLabel>

      {/* email */}

      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
        <Form.Control type="email" onChange={e=>getandsetuserNormalinputs(e)} name='email' placeholder="Email" value={normalInput.value} />
      </FloatingLabel>


      {/* mobile*/}


      <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='mobile' placeholder="Mobile" value={normalInput.value} />
      </FloatingLabel>

      {/* gender */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Select Gender</Form.Label>
        <Form.Check type={"radio"} onChange={e=>getandsetuserNormalinputs(e)} name='gender' value={'male'} label={"Male"}  />
        <Form.Check type={"radio"} onChange={e=>getandsetuserNormalinputs(e)} name='gender' value={'Female'} label={"Female"} />

      </Form.Group>

      {/* status */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Select Employee Status</Form.Label>
        <Select onChange={e=>setStatus(e.value)} options={options}/>
        

      </Form.Group>

      {/* file upload */}

      <Form.Group className='mb-3 col-lg-6'>

        <Form.Label>Choose Profile Picture</Form.Label>
        
        <Form.Control type="file" onChange={e=>handleFile(e)} name='profile' />

      </Form.Group>

      {/* location */}

      <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatingInputlocation" label="Location">
        <Form.Control type="text" onChange={e=>getandsetuserNormalinputs(e)} name='location' placeholder="Location" value={normalInput.value} />
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

export default Add