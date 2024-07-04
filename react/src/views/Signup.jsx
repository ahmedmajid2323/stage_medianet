import photo from '../assets/signup.jpg'
import logo from '../assets/logo1.png'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axiosClient from '../axios'
import loaders from '../views/loader.module.css'


export default function Signup() {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [password_confirmation , setPasswordConf] = useState('')
    const [Error , setError] = useState({__html :""})
    const [message , setMessage] = useState({__html:''})
    const [loading , setLoading] = useState(false)

    /* const [token , setToken] = useState( localStorage.getItem('TOKEN') ||'')
    const navigate = useNavigate() ;

    const _settoken = (token) => {
        if(token){
            localStorage.setItem('TOKEN',token)
        }else{
            localStorage.removeItem('TOKEN')
        }
        setToken(token)
    } */

    const handleSubmit= (e)=>{
        setLoading(true)
        e.preventDefault() ;
        axiosClient.post('/signup' , {name , email , password,password_confirmation})
        .then(({data})=>{
            setEmail('');
            setLoading(false)
            setPassword('');
            setName('');
            setPasswordConf('');
            setMessage({__html :'You are one step further to activate your account ! <br/> Please check your E-mail'})
            return data
        })
        .catch((error) => {
            if (error.response) {
                const errorsArray = Object.values(error.response.data.errors)
                                    .flat(); // Flatten the array of error messages
                setError({ __html: errorsArray.join('<br/>') });
            } else {
                console.log('Error:', error.message );
            }
            setLoading(false)
        });
    }
    console.log(Error);
        
  return (
    <>

    <div style={{display:'grid',gridTemplateColumns: "60% 40%",gridTemplateRows: "100vh"}}>
      <div style={{height:'100vh'}}> 
        <img src={photo} style={{height:'100vh',width:'100%'}} />
        <div style={{position:"absolute",top:'4%',left:'7%'}}>
            <img src={logo} className='ml-48' style={{filter: 'drop-shadow(0px 0px 15px white)'}} />
            <h1 style={{fontWeight:"600"}} className='text-white font-serif'>Join us for a global career launch!</h1>
        </div>
      </div>
      <div className='bg-gray-800 '>
        <div style={{borderRadius:'20px',boxShadow:'0px 0px 10px gray',margin:'10px',height:'97%',
            display:'flex',flexDirection:'column'
        }}>
            <div className='flex justify-center mt-12 font-serif'
            style={{color:'white',fontWeight:'600',}}>
                <h1>sign up</h1>
            </div>
            <div className='p-10'>
                <form onSubmit={handleSubmit} method="post">

                    {loading ? <div className={loaders.loader}></div> : ''}

                    {Error.__html &&
                        <h6 className="text-white bg-red-400 border-2 border-red-500 p-2 rounded-xl" 
                        dangerouslySetInnerHTML={Error} />
                    }

                    {message.__html &&
                        <h6 className="text-white bg-blue-400 border-2 border-blue-500 p-2 rounded-xl" 
                        dangerouslySetInnerHTML={message} />
                    }

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='text-white font-serif'>Full name :</Form.Label>
                        <Form.Control type="text" placeholder="full name"
                        value = {name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                        {(!Error.__html && !message.__html) &&
                        <svg style={{position:'absolute',left:'94%',top:'26.5%'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>}
                        

                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='text-white font-serif'>Email address :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        {(!Error.__html && !message.__html) &&
                        <svg style={{position:'absolute',left:'94%',top:'38.5%'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>}
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='text-white font-serif'>Password :</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" 
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        {(!Error.__html && !message.__html) &&
                        <svg style={{position:'absolute',left:'94%',top:'50.5%'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>}
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='text-white font-serif'>Password confirmation :</Form.Label>
                        <Form.Control value={password_confirmation} onChange={(e)=>setPasswordConf(e.target.value)}
                         type="password" placeholder="confirm your password" />
                        { (!Error.__html && !message.__html) &&
                        <svg style={{position:'absolute',left:'94%',top:'62%'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path className='text-gray-800'  stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg> }
                        

                    </Form.Group>

                    <button style={{width:'50%',borderRadius:'20px',fontWeight:'600',border:'1px solid white'}}
                    className='p-2 text-white hover:bg-gray-500  font-serif mt-10 ml-32 bg-gray-800'>
                        submit
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
