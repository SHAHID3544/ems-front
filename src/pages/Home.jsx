import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Loadingspinner from '../components/Loadingspinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allUsers, deleteUser } from '../services/allApi'




function Home() {

  const{registerData,setregisterData}=useContext(registerContext)

  const[showspin,setshowspin]=useState(true)

  const[allUsersData,setallUsersData]=useState([])

  const[search,setSearch]=useState("")

  useEffect(() => {

    // call getAllEmployees function

    getAllEmployees()

    setTimeout(()=>{
      setshowspin(false)
    },2000)
    
  
    
  }, [search])




  // function definition for get all data

  const getAllEmployees=async()=>{

    const response=await allUsers(search)
    console.log(response);
    setallUsersData(response.data)
    
  }


  // delete employee

  const removeUser=async(id)=>{
    const response= await deleteUser(id)
    console.log(id);

    if(response.status===200){
      getAllEmployees()

    }
    else{
      alert("failed! please try after sometime..")
    }
  }
  
  return (
    <>


    {
      registerData&&<Alert variant='success' onClose={()=>setregisterData("")}dismissible>
        {registerData.fname.toUpperCase()} registered successfully

      </Alert>
    }

    

      
{
   showspin?
    <Loadingspinner/>:

    <div className='container'>

      <div className='search-all d-flex align-items-center '>

        <div className='search d-flex align-items-center '>

          <span className='fw-bolder'>Search:</span>
          <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-3' style={{width:'300px'}}/>

        </div>
        <Link to={'/Add'} className='btn btn-primary ms-auto'>
          Add <i class="fa-solid fa-user-plus"></i>
        </Link>

      </div>
      <div className='table mt-5'>
        <h1 className='fw-bold'>List of All Employees</h1>


        <Hometable displayData={allUsersData} removeuser={removeUser}/>


      </div>

    </div>
    
    }

     
    


    </>
  )
}

export default Home