import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Loadingspinner from '../components/Loadingspinner'
import { useParams } from 'react-router-dom'
import { allUsers } from '../services/allApi'
import { BASE_URL } from '../services/baseUrl'





function View() {

  const[showspin,setshowspin]=useState(true)

  const[user,setUser]=useState({})

  const {id}=useParams()

  // console.log(id);

  

  useEffect(() => {

    getuser()

    setTimeout(()=>{
      setshowspin(false)
    },2000)
    
  }, [])

  // api call for getting single user details in view

  const getuser=async()=>{
    const {data}=await allUsers("")
    console.log(data);

    // console.log(data.find(item=>item._id===id));
    setUser(data.find(item=>item._id===id))
  }

  console.log(user);




  return (
    <>
{
  showspin?
  <Loadingspinner/>:
    <div className='container' style={{height:'80vh'}}>

      {

        user?
        <Card className='shadow col-lg-6 ms-auto mt-5 p-3'>

        {/* image div */}

      <div className='text-center'>
          <img style={{width:'50px',borderRadius:'50%'}} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />

        </div>

        {/* contents */}

        <div className='text-center'>
          <h3> {user.fname} {user.lname}</h3>
          <h5>Email: {user.email}</h5>
          <h5>Mobile: {user.mobile}</h5>
          <h5>Gender: {user.gender}</h5>
          <h5>Status: {user.status}</h5>
          <h5>Location: {user.location}</h5>

        </div>

      </Card> :""

      }
    </div>
    }
    
    
    </>
  )
}

export default View