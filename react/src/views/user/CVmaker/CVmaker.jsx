import { PDFViewer } from "@react-pdf/renderer";
import SidebarNav from "../Sidebar";
import MyDocument from "./Document";
import Forms from "./forms";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../GlobalState";
import {  Navigate, useParams } from "react-router-dom";
import Fakedoc from "./fakedoc";
import axiosClient from "../../../axios";
import { GlobalContext } from "./GlobalState";
import Modal from 'react-bootstrap/Modal';
import Resume_tracker from "./resume_tracker";
import Competences from "./forms_components.jsx/competences";



export default function CVmaker() {

  const {userToken} = useContext(GlobalStateContext)
  const {personnelle , experience_data , projet , certificat , competence} = useContext(GlobalContext)
  const [ personnelleData , setPersonnelleData] = useState({})
  const [ experienceData , setExperienceData] = useState([])
  const [ projectData , setProjectData] = useState([])
  const [ certificatData , setCertificatData] = useState([])
  const [ competenceData , setCompetenceData] = useState({})
  const {cv_id} = useParams()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
        axiosClient.get(`/get_inf_personnelle/${cv_id}`)
        .then(({data})=>{
        setPersonnelleData(JSON.parse(data.personnelle))
        })
        .catch((error)=>{
        console.log(error);
        })
    },[personnelle]) 

    useEffect(()=>{
        axiosClient.get(`/get_experience/${cv_id}`)
        .then(({data})=>{
            setExperienceData(JSON.parse(data.experience))
        })
        .catch((error)=>{
        console.log(error);
        })
    },[experience_data])

    useEffect(()=>{
        axiosClient.get(`/get_project/${cv_id}`)
        .then(({data})=>{
            setProjectData(JSON.parse(data.project))
        })
        .catch((error)=>{
        console.log(error);
        })
    },[projet])

    useEffect(()=>{
        axiosClient.get(`/get_certificat/${cv_id}`)
        .then(({data})=>{
            setCertificatData(JSON.parse(data.certificat))
        })
        .catch((error)=>{
        console.log(error);
        })
  },[certificat])

    useEffect(()=>{
        axiosClient.get(`/get_competence/${cv_id}`)
        .then(({data})=>{
            setCompetenceData(JSON.parse(data.competence))
        })
        .catch((error)=>{
        console.log(error);
        })
  },[competence])
  const languages_length = competenceData?.languages?.length || 0;
  const technical_length = competenceData?.technical_skills?.length || 0 ;
  const general_length = competenceData?.general_skills?.length || 0 ;
  const certificates_length = certificatData?.length || 0 ;
  const projects_length = projectData?.length || 0;
  const experiences_length = experienceData?.length || 0 ;
  const all = languages_length+technical_length+general_length+certificates_length+projects_length+experiences_length ;
  console.log(all);

  if(!userToken){
    return <Navigate to='/home' />
  }

  return (
    <>
      
      <div style={{backgroundColor:'lightgray'}}>
        <SidebarNav />
        <div style={{
          display:'grid',gridTemplateColumns: "52% 42%",gap:'5%',gridTemplateRows: "auto",
          height:'101vh',padding:'1% 1% 1% 5%' }}>

          <div style={{gridTemplateRows:'auto 8%',gap:'1%',display:'grid'
            }}>

              <div style={{backgroundColor:'white',padding:'15px',boxShadow:'10px 10px 20px gray',borderRadius:'10px'}}>
                <Forms document={<MyDocument personnelleData={personnelleData}
                certificatData={certificatData}
                experienceData={experienceData}
                projectData={projectData}
                competenceData={competenceData}/>} />
              </div>
              <div className=" flex justify-center items-center"
               style={{backgroundColor:'white',padding:'-10px',boxShadow:'10px 10px 20px gray',borderRadius:'10px'}}>
                <ProgressBar onClick={handleShow} style={{filter: 'drop-shadow(-10px 10px 15px black)'}}
                className=' w-3/4 hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                 animated variant='primaire' 
                 now={((all)*100)/24} max={100}
                 label={isNaN(Number(((all*100)/24).toFixed(1))) ? null : Number(((all*100)/24).toFixed(1))} />
              </div>
               
          </div>

          <Modal centered show={show} onHide={handleClose}>

            <Modal.Body className=" p-4">
              <div className=" flex justify-center">
                <h1 style={{ fontFamily: 'cursive', fontWeight: '600',fontSize:'150%' }} className="text-gray-800">
                  Resume Building Tracker
                </h1>
              </div>

              <Resume_tracker
              technical={technical_length}
              general={general_length}
              languages={languages_length}
              experiences={experiences_length}
              projects={projects_length}
              certificates={certificates_length}
              />
              
            </Modal.Body>

          </Modal>

          <div style={{padding:'15px',backgroundColor:'white',boxShadow:'10px 10px 20px gray',borderRadius:'10px'}}>
              
             {/*   <PDFViewer width='100%' height='90%'>
                <MyDocument personnelleData={personnelleData}
               certificatData={certificatData}
               experienceData={experienceData}
               projectData={projectData}
               competenceData={competenceData}/>             
              </PDFViewer>  */}
              <Fakedoc personnelleData={personnelleData}
               certificatData={certificatData}
               experienceData={experienceData}
               projectData={projectData}
               competenceData={competenceData}/>
      
          </div>
          
        </div>
      </div>

    </>
  )
}



