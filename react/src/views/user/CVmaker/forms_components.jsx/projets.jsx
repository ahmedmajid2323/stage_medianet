import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../../../axios';
import { GlobalContext } from '../GlobalState';
import { useParams } from 'react-router-dom';

export default function Projets() {

    const {setProjet} = useContext(GlobalContext)
    const [data , setData] = useState({})
    const {cv_id} = useParams()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axiosClient.post(`/project/${cv_id}` , data)
        .then(({data})=>{
            setProjet(data.project)
            setData({
                project:'',
                description:'',
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }
  

  return (
    <div>

        <form onSubmit={handleSubmit} action="post">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control value={data.project} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                type="text" placeholder="project name" name='project' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control value={data.description} onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                as="textarea" rows={2} placeholder='description..' name='description' />
            </Form.Group>

            <button style={{borderRadius:"10px",padding:'2px'}} className='bg-gray-800'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path style={{color:'white'}} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </button>
        </form>
      
    </div>
  )
}
