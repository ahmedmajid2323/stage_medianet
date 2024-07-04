import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axiosClient from '../../../../axios';

export default function Edit({user}) {

    const [address , setAddress] = useState('')
    const [etablishment , setEtablishment] = useState('')
    const [aboutme , setAboutme] = useState('')
    const [phone , setPhone] = useState('')
    const [profession , setProfession] = useState('')
    const [skillForm , setSkillForm] = useState(1)
    const [skills , setSkills] = useState([{ skill: '', percentage: '' }])

    const handleSubmit = (e)=>{
        e.preventDefault() ;
        axiosClient.post('/updateprofile'
        , {address,etablishment,phone,profession,skills,aboutme})
    }
    
    function addFormSkill(){
        setSkillForm(skillForm + 1)
        setSkills(prevSkills => [...prevSkills, { skill: '', percentage: '' }]);
    }
    const handleSkillChange = (index, field, value) => {
        const updatedSkills = skills.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        );
        setSkills(updatedSkills);
      };
    console.log(skills);

  return (
    <div>
        <form onSubmit={handleSubmit} action="post">
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label style={{fontWeight:'600'}} className='text-gray-800 font-serif'>Full name :</Form.Label>
                <Form.Control disabled type="text" value={user.name}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label style={{fontWeight:'600'}} className='text-gray-800 font-serif'>About me :</Form.Label>
                <Form.Control
                value={aboutme} onChange={(e)=>setAboutme(e.target.value)}
                as="textarea" rows={2}   />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label style={{fontWeight:'600',}} className='text-gray-800 font-serif'>Address :</Form.Label>
                <Form.Control
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                type="text" />
            </Form.Group>
            <Form.Group>
            <Row>   
                <Col>
                    <label style={{fontWeight:'600',}} className='text-gray-800 font-serif' htmlFor="">company / etablishment :</label>
                    <Form.Control
                    value={etablishment}
                    onChange={(e)=>setEtablishment(e.target.value)}
                     type='text' />
                </Col>
                <Col>
                    <label style={{fontWeight:'600',}} className='text-gray-800 font-serif' htmlFor="">profession :</label>
                    <Form.Control
                    value={profession}
                    onChange={(e)=>setProfession(e.target.value)}
                    type='text' />
                </Col>
            </Row>
            </Form.Group> <br />
            
            <Form.Label style={{fontWeight:'600',}} className='text-gray-800 font-serif'>Skills :</Form.Label> 
            {Array.from({ length: skillForm }).map((_, index) => (
                <div key={index} className=' flex gap-1 mb-1'>
                    <Form.Control
                    value={skills[index].skill}
                    onChange={(e) => handleSkillChange(index, 'skill', e.target.value)}
                    type="text" placeholder='skill' />
                    <Form.Control
                     value={skills[index].percentage}
                     onChange={(e) => handleSkillChange(index, 'percentage', e.target.value)}
                    type="number"
                    placeholder='%'min="0" max="100" step="10"
                    /> 
                </div> 
            ))}
            
            <div onClick={()=>addFormSkill()}
                 style={{marginLeft:'95%',width:'4.2%',borderRadius:"10px",padding:'2px'}}
                 className='bg-gray-800 mt-1 hover:bg-gray-500 hover:cursor-pointer '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path style={{color:'white'}} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div> <br />

            <Form.Group  className="mb-3" controlId="formGroupEmail">
                <Form.Label style={{fontWeight:'600',}} className='text-gray-800 font-serif'>Change your profile picture :</Form.Label>
                <Form.Control
                /* onChange={handleFileChange} */
                type="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Row>
                <Col>
                  <Form.Label style={{fontWeight:'600',}} className='text-gray-800 font-serif'>Phone number :</Form.Label>
                  <Form.Control style={{width:'50%'}}
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  type="text" placeholder={phone} />
                </Col>
              </Row>
                
            </Form.Group>
            <button style={{width:'50%',borderRadius:'20px',fontWeight:'600'}}
                    className='p-2 text-white hover:bg-gray-500  font-serif mt-10 ml-32 bg-gray-800'>
                submit
            </button>
          </form>
      
    </div>
  )
}
