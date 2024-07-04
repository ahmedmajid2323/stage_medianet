import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import axiosClient from '../../../../axios';
import { GlobalContext } from '../GlobalState';
import { useParams } from 'react-router-dom';

export default function Certificats() {

    const {setCertificat} = useContext(GlobalContext)
    const [data , setData] = useState({})
    const {cv_id} = useParams()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axiosClient.post(`/certificat/${cv_id}` , data)
        .then(({data})=>{
            setCertificat(data.certificat)
            setData({
                title:'',
                date:'',
                organization:'',
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div>

        <form onSubmit={handleSubmit} action="post">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.title} onChange={(e)=>setData({...data , [e.target.name]:e.target.value })}
                         placeholder="title" name='title' />
                    </Col>
                    <Col>
                        <Form.Control value={data.organization} onChange={(e)=>setData({...data , [e.target.name]:e.target.value })}
                         placeholder="organization" name='organization' />
                    </Col>  
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.date} onChange={(e)=>setData({...data , [e.target.name]:e.target.value })}
                         type='date' name='date' />
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
