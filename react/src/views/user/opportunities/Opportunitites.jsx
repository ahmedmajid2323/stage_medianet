import SidebarNav from "../Sidebar";
import logo from '../../../assets/logo1.png'
import opportunity from '../../../assets/opportunity.jpg'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState , useContext, useEffect  } from "react";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { GlobalStateContext } from "../GlobalState";
import {  Navigate } from "react-router-dom";
import axiosClient from "../../../axios";
import loader from '../../../views/loader.module.css'


export default function Opportunitites() {

    const [ entreprises , setEntreprises]  = useState([])
    const [ opportunities , setOpportunities]  = useState([])
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [loading , setLoadig] = useState(true)

    const [searchValue , setSearchValue] = useState("")

    const filteredItems = opportunities.filter((opportunity) =>
        opportunity.entreprise.toLowerCase().includes(searchValue.toLowerCase()) ||
        opportunity.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        opportunity.departement.toLowerCase().includes(searchValue.toLowerCase()) 
    )

    useEffect(()=>{
        axiosClient.post('/opportunities')
        .then(({data})=>{
            setEntreprises(data.entreprises)
            setOpportunities(data.opportunities)
            setLoadig(false)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    const {userToken} = useContext(GlobalStateContext)
  if(!userToken){
    return <Navigate to='/home' />
  }

    // Function to handle showing the modal with selected opportunity details
    const handleShow = (opportunity) => {
        setSelectedOpportunity(opportunity);
    };

    // Function to handle closing the modal
    const handleClose = () => {
        setSelectedOpportunity(null);
    };

  return (

    <>
    <div style={{}}>
        <SidebarNav/>
        <div style={{display:'grid',gridTemplateColumns:'100%',gridTemplateRows:'50% auto',gap:'60px',backgroundColor:'lightgray'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'40px',
                        backgroundImage:`url(${opportunity})`,backgroundSize:'cover' }}>
           
                <div style={{zIndex:'1',backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
                    <div /* style={{display:'flex',flexDirection:'column'}} */>
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <img src={logo} 
                                style={{ filter:'drop-shadow(0px 0px 10px black)'}} />
                            </div> <br />
                            <h1 className=" text-center text-white font-serif">🌟 Unlock Your Potential: Seize Every Opportunity 🌟</h1> <br /><br />
                            <h2 className=" text-center text-white font-serif"
                            style={{fontWeight:'600'}}
                            >Every job application and internship is a stepping stone to your dream career. <br /> Embrace the journey, challenge yourself, and believe in your growth.</h2>
                    </div> <br /><br /><br />

                    <div style={{position:'absolute',top:'48%',left:'37.3%'}}>

                        <input type="text" className="p-3 bg-gray-800 w-96 text-white"

                        value={searchValue}
                        onChange={(e)=> setSearchValue(e.target.value)}
                        /* onBlur={() => setSearchValue('') } */
 
                        style={{borderRadius:'30px',}}
                        placeholder="Search..." />
                        <svg style={{position:'absolute',top:'15px',left:'87%'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path className="text-white" strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      
                    </div>
                </div>
                
            </div>

            <div className="p-4 ml-12" >
            <Row xs={1} md={4} className="g-4">
                {loading ? <div style={{marginLeft:'47%'}} className={loader.loader}></div>
                : entreprises.map((entreprise) => (
                    filteredItems
                        .filter(opportunity => opportunity.entreprise === entreprise.name)
                        .map((opportunity) =>
                            <Col onClick={() => handleShow(opportunity)} className="cursor-pointer hover:scale-105 duration-500" key={opportunity.id}>
                                <Card style={{boxShadow:'10px 10px 20px gray', height:'100%'}}>
                                    <Card.Title className="text-white bg-gray-800 border-b-2 flex justify-center p-5 shadow-lg">{entreprise.name}</Card.Title>
                                    <Card.Body >
                                        <div className="flex justify-between">
                                            <Card.Title className="text-gray-800">{opportunity.departement}</Card.Title>
                                            <Card.Title className="text-gray-800">{opportunity.type}</Card.Title>
                                        </div>
                                        <Card.Text className="text-gray-800">
                                            {entreprise.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                ))}
            </Row>
            </div>

            {selectedOpportunity && (
                <Modal
                    show={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    animation={false}>

                    <Modal.Body>

                        <div className="flex justify-between p-3">
                            <h1 style={{fontFamily:'DM Serif Display'}}>{selectedOpportunity.entreprise}</h1>
                            <h1 style={{fontFamily:'DM Serif Display'}}>{selectedOpportunity.type}</h1>
                        </div>
                        <p className=" ml-4" style={{fontFamily:"Zilla Slab"}}>{selectedOpportunity.departement}</p>

                        <div style={{borderRadius:'20px'
                                ,padding:'20px',border:'1px solid gray',margin:'25px'}}>
                            <div style={{display:'grid',gridTemplateColumns:'35% 65%',
                            }}>

                                <div style={{borderRight:'1px solid gray',borderBottom:'1px solid gray'}}>
                                    <h3 style={{fontFamily:'DM Serif Display'}}>Skills required :</h3>
                                    <ul>
                                        {JSON.parse(selectedOpportunity.skills_required).map((skill)=>
                                            <li style={{fontFamily:"Zilla Slab"}} key={skill}>- {skill}</li>
                                        )}
                                    </ul>
                                </div>

                                <div style={{borderBottom:'1px solid gray'}} className=" pl-12">
                                    <h3 style={{fontFamily:'DM Serif Display'}}>Description :</h3>
                                    <p style={{fontFamily:"Zilla Slab"}}>{selectedOpportunity.description}</p>
                                </div>

                            </div >
                                 
                            <div className=" pt-2">
                                <h3 style={{fontFamily:'DM Serif Display'}}>Contact :</h3>
                                <p style={{fontFamily:"Zilla Slab"}}>{selectedOpportunity.contact}</p> 
                            </div>

                        </div>

                        <Accordion flush className="p-3">
                              <Accordion.Item eventKey="0">
                                  <Accordion.Header style={{fontFamily:'DM Serif Display'}}>Apply for this opportunity !</Accordion.Header>
                                  <Accordion.Body>
                                      <Form action="post" /* onSubmit={handleSubmit} */>

                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                              <Form.Label>Full name :</Form.Label>
                                              <Form.Control type="email"  />
                                          </Form.Group>

                                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                              <Form.Label>Upload your resume :</Form.Label>
                                              <Form.Control type="file" placeholder="name@example.com" />
                                          </Form.Group>

                                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Label>Description</Form.Label>
                                              <Form.Control as="textarea" rows={2} />
                                          </Form.Group>

                                          <div className="flex justify-center">
                                            <button style={{fontFamily:'DM Serif Display'}}
                                             className="flex justify-center hover:bg-gray-500 w-72 p-2 rounded-full bg-gray-800 text-white">
                                                Apply !
                                            </button>
                                          </div>
                                          
                                      </Form>
                                  </Accordion.Body>
                              </Accordion.Item>
                          </Accordion>

                    </Modal.Body>

                </Modal>
            )}
        </div>
      
    </div>
    </>  
  )
}
