import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import {useContext, useState } from 'react';
import logo from '../../assets/logo1.png'
import login from '../../assets/login.jpg'
import axiosClient from '../../axios';
import { GlobalStateContext } from '../user/GlobalState';
import { useNavigate } from 'react-router-dom';


function MyVerticallyCenteredModal(props) {

  const {setToken  } = useContext(GlobalStateContext)

  const navigate = useNavigate()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [Error , setError] = useState({__html :""})

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axiosClient.post('/login', {email , password})
      .then((response)=>{

        setEmail('')
        setPassword('')
        setToken(response.data.token) ;
        navigate('/user')

      })
    .catch((error)=>{
      if (error.response) {
        setError({ __html: error.response.data.error});
      } else {
        console.log('Error:', error.message );
    }
    })

  }
   

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='bg-gray-800'
      style={{borderBottom:'none'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft: "39%"}}>
          
          <img src={logo} 
          className='w-40 items-center' style={{filter: 'drop-shadow(0px 0px 10px whitesmoke)'}} />
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-gray-800'>
        <div style={{height: "60vh" , display:'flex' ,justifyContent: "space-between" }}>
          <div style={{display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap:'60px'
            }} className='ml-16 mb-20'>
            <h2 style={{fontFamily:'cursive',fontWeight:'600',color:'white'}}>welcome back !</h2>

            <form className='w-60 text-white' onSubmit={handleSubmit} method="post">

              {Error.__html &&
                <h6 className="text-white bg-red-400 border-2 border-red-500 p-2 rounded-xl" 
                dangerouslySetInnerHTML={Error} />
              }

              <label>Email :</label><br />

              <input required className=' text-black' style={{border:'1px solid black',width:'100%', borderRadius:'20px', padding:'10px'}}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" /> 
              {!Error.__html && 
              <svg style={{position:'absolute',left:'35%',bottom:'57%'}}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
             </svg>}
              
              <br />

              <label >password :</label><br />

              <input required style={{border:'1px solid black',width:'100%', borderRadius:'20px', padding:'10px'}} className=' text-black'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"/> 
              {!Error.__html &&
              <svg style={{position:'absolute',left:'35%',bottom:'42.5%'}}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
             </svg>}
              
              <br /><br />

              <button type='submit' className=' hover:bg-white hover:text-gray-800'
              style={{border:'1px solid white',padding:'10px',width:'100%',borderRadius:'10px'}}>login</button>

            </form>
          </div>
          <div style={{width:'52%', height:'64.4vh' ,marginTop:'-16px'}}>
            <img style={{width:'100%',height:'100%',objectFit:'cover',marginLeft:'16px'}}
              src={login} />
          </div>
        </div>
        
      </Modal.Body>
      
    </Modal>
  );
}

 export default function Login() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      
      <button onClick={() => setModalShow(true)}> login</button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
