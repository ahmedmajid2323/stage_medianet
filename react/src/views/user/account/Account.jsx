import SidebarNav from "../Sidebar";
import Modal from 'react-bootstrap/Modal';
import Header from "./components/header";
import { useContext, useState ,useEffect} from "react";
import { GlobalStateContext } from "../GlobalState";
import { Navigate } from "react-router-dom";
import axiosClient from "../../../axios";
import Resume from "./components/Resume";
import Edit from "./components/edit";

export default function Account() {

  const {userToken ,setCurrentUser, currentUser} = useContext(GlobalStateContext)
  useEffect(()=>{

    axiosClient.post('/currentuser')
    .then(({data})=>{
        setCurrentUser(data.user)
    })
    .catch((error) =>
        console.log(error)
    )
  },[])
  console.log(currentUser.skills);

  const [show, setShow] = useState(false);
 
  if(!userToken){
    return <Navigate to='/home' />
  }

  return (
    <>
      <SidebarNav />

      <div style={{display:'grid',gridTemplateRows:'auto auto',backgroundColor:'lightgray'}}>

        <div className="flex justify-center ">
          <Header/>
          
        </div>

        <div style={{display:'grid',gridTemplateColumns:'50% auto',gap:'40px',padding:'2% 2% 2% 6%'}}> 
          <div style={{borderRadius:'20px',boxShadow:'0px 0px 10px gray',padding:'5%'}}>

            <div className="flex justify-center gap-5">
              <h1  className="text-gray-800 font-serif">
                your profile 
              </h1>
              <div onClick={() => setShow(true)}
               className='p-3 hover:bg-gray-500 cursor-pointer rounded-full bg-gray-800 flex justify-normal items-center'> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path className="text-white" strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </div>
            </div>

            <div className=" p-4">
              
              <div className=" pl-8 pr-8">
                <h3 className=" flex justify-center text-gray-800" style={{fontWeight:'600',fontFamily:'serif'}}>About me :</h3>
                <h5 className=" flex justify-center " style={{fontFamily:"Nunito"}}>
                  {currentUser.about_me}
                </h5>
              </div> <br />

              <div className=" flex justify-between pl-8 pr-8">
                <div>
                  <h3 className=" text-gray-800" style={{fontWeight:'600',fontFamily:'serif'}}>Profession :</h3>
                  <h5 style={{fontFamily:"Nunito"}}>{currentUser.profession}</h5>
                </div>
                <div>
                  <h3 className=" text-gray-800" style={{fontWeight:'600',fontFamily:'serif'}}>Establishment :</h3>
                  <h5 style={{fontFamily:"Nunito"}}>{currentUser.etablishment}</h5>
                </div>
              </div> <br />
              
              <div style={{border:'1px dotted black'}} className="border-black rounded-xl p-1">
                <div className="flex justify-center">
                  <h3 className=" text-gray-800" style={{fontWeight:'600',fontFamily:'serif'}}>Skills</h3>
                </div> 
                {currentUser.skills ? (
                  JSON.parse(currentUser.skills).map((item, index) => (
                    <div key={index} className="flex justify-evenly items-center  mb-2">
                      <div>
                        <h6 style={{ fontFamily: "Nunito" }}>{item.skill}</h6>
                      </div>
                      <div className="w-52 border-2 border-gray-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gray-800 h-full flex items-center justify-center rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        >
                          <span className="text-xs text-white font-semibold">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))) : null}
              </div>

            </div>


        
          </div>

            <div style={{borderRadius:'20px',backgroundColor:'lightgray',boxShadow:'0px 0px 10px gray'}}>
              <Resume/>
            </div>

        </div>

      </div>
      <Modal   size="lg" show={show} onHide={() => setShow(false)} animation={false}>
        
        <Modal.Body className=" rounded-xl p-5" style={{backgroundColor:'lightgray'}}>
        <div className="flex justify-center">
          <h1  className="text-gray-800 font-serif">
            update your profile 
          </h1>
         </div><br />
          <Edit user={currentUser} />
        </Modal.Body>
        
      </Modal>

    </>
  )
}
