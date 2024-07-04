import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import { GlobalContext } from '../GlobalState';
import axiosClient from '../../../../axios'
import { useParams } from 'react-router-dom';

export default function Personnelle() {

    const { setPersonnelle} = useContext(GlobalContext)
    const [data , setdata] = useState({})
    const {cv_id} = useParams() ;

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosClient.post(`/inf_personnelle/${cv_id}`, data )
        .then(({data})=>{
            setPersonnelle(data.personnelle)
            setdata({
                fullname:'',
                phone:'',
                profession:'',
                summary:'',
                email:'',
                address:''
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    

  return (
    <div>

        <form onSubmit={handleSubmit} method='post'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                    <Col>
                        <Form.Control value={data.fullname}  required
                        onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                        name='fullname' placeholder="Fullname" />
                    </Col>
                    <Col>
                        <Form.Control value={data.phone} required
                        onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                         name='phone' placeholder="phone number" />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.email} required
                         onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                         name='email' placeholder="your email.." />
                    </Col>
                    <Col>
                        <Form.Control value={data.address}  required
                        onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                         name='address' placeholder="address.." />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
                <Form.Control value={data.summary} required
                onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                 as="textarea" rows={1} name='summary' placeholder="summary.." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.profession} required
                        onChange={(e)=>setdata({...data, [e.target.name]:e.target.value})}
                         name='profession' placeholder="profession" />
                    </Col>
                    <Col>
                    <button style={{borderRadius:"10px",padding:'2px'}} className='bg-gray-800 mt-1'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path style={{color:'white'}} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </button>
                    </Col>
                </Row>
            </Form.Group>
        </form>
        
    </div>
  )
}
