import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import { GlobalContext } from '../GlobalState';
import axiosClient from '../../../../axios';
import { useParams } from 'react-router-dom';

export default function Experience() {

    const {setExperience} = useContext(GlobalContext)
    const [data , setData] = useState({})
    const {cv_id} = useParams()
    
    const handleSubmit = (e) => {   
        e.preventDefault()
        axiosClient.post(`/experience/${cv_id}` , data)
        .then(({data})=>{
            setExperience(JSON.parse(data.experience));
            setData({
                diplome:'',
                company:'',
                lieu:'',
                date:'',
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

  return (
    <div>

        <form onSubmit={handleSubmit} method='post'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.diplome} onChange={(e)=>setData({...data , [e.target.name]:e.target.value})}
                         placeholder="diploma / workstation" name='diplome' />
                    </Col>
                    <Col>
                        <Form.Control value={data.company} onChange={(e)=>setData({...data , [e.target.name]:e.target.value})}
                         placeholder="establishment / company" name='company' />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control value={data.date} onChange={(e)=>setData({...data , [e.target.name]:e.target.value})}
                         type='date' name='date' />
                    </Col>
                    <Col>
                        <Form.Control value={data.lieu} onChange={(e)=>setData({...data , [e.target.name]:e.target.value})}
                         type='text' placeholder='place' name='lieu' />
                    </Col>
                </Row>
            </Form.Group>

            <button style={{ borderRadius: "10px", padding: '2px' }} className='bg-gray-800'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path style={{ color: 'white' }} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </form>
      
    </div>
  )
}
