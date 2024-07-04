import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import axiosClient from '../../../../axios';
import { GlobalContext } from '../GlobalState';
import { useParams } from 'react-router-dom';

export default function Competences() {

    const {setCompetence} = useContext(GlobalContext)
    const [ option , setoption] = useState('')
    const [ level , setLevel] = useState('')
    const [ title , setTitle] = useState('')
    const {cv_id} = useParams()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axiosClient.post(`/competence/${cv_id}`,{ option ,level ,title})
        .then(({data})=>{
            setCompetence(data.competence)
        })
        .catch(error=>{
            console.log(error);
        })
    }
  return (
    <div>
      
        <form method='post' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Select
                        className='hover:cursor-pointer'
                        onChange={(e)=>setoption(e.target.value)} value={option} 
                        aria-label="1">
                            <option>choose</option>
                            <option value="languages">languages</option>
                            <option value="technical_skills">technical skills</option>
                            <option value="general_skills">general skills</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)}
                         placeholder="title" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        { option !== 'technical_skills' &&     
                            <Form.Select value={level} onChange={(e)=>setLevel(e.target.value)}
                            className=' hover:cursor-pointer' aria-label="1">
                                <option>choose</option>
                                <option value='1'>beginner</option>
                                <option value='2'>intermediate</option>
                                <option value='3'>advanced</option>
                                <option value='4'>expert</option>
                            </Form.Select>
                        }
                        
                    </Col>
                    <Col>
                    <button style={{borderRadius:"10px",padding:'2px', marginRight: option === "technical_skills" ? '640px' : '0px'}} className='bg-gray-800 mt-1'>

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
