import { useEffect, useState } from 'react'
import resume from '../../../../assets/resume.png'
import axiosClient from '../../../../axios'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import loader from '../../../../views/loader.module.css'
import add from '../../../../assets/sheet.png'

export default function Resume() {

  const [resumes , setResumes] = useState([])
  const [loading , setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    axiosClient.get('/get_resume')
    .then(({data})=>{
     setResumes((data.cv))
     setLoading(false)
    })
    .catch(error=>{
      console.log(error);
      
    })
  },[])

  const handleClick = ()=>{
    axiosClient.post('/create_cv')
    .then(({data})=>{
      navigate(`CVmaker/${data.id}`)
    })
  }
  function deleteCV(id){
    axiosClient.delete(`/delete_cv/${id}`)
    .then(()=>{
      setResumes(resumes.filter((cv)=> cv.id !== id))
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div>
      <div className='flex justify-center mt-4 font-serif text-gray-800'
        style={{ fontWeight: '600', }}>
        <h1>My resumes</h1>
      </div>
      <div className=' ml-14' 
      style={{padding: '20px', display: 'grid', gridTemplateColumns: '20% 20% 20% 20%', gap: '20px' }} >
        { loading ? <div style={{marginTop:'55px'}} className={loader.loader1}></div> :
          resumes.map((item , index)=>(
            <div key={index}
            style={{filter: 'drop-shadow(0px 10px 15px black)',flexDirection:'column',gap:'10px',backgroundImage:`url(${resume})`,backgroundSize:'contain',backgroundRepeat:'no-repeat', backgroundPosition: 'center'}}
            className=" h-44 flex justify-center items-center  rounded-2xl ">

              <div>{moment(item.created_at).format('YYYY-MM-DD')}</div><br /><br />
              
              <div style={{display:'flex',gap:'15px'}}>
                <svg onClick={()=>navigate(`CVmaker/${item.id}`)}
                 className='hover:cursor-pointer  w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path className=' hover:text-gray-800 text-gray-400' strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                <svg onClick={()=>deleteCV(item.id)}
                 className='hover:cursor-pointer w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                  <path className='hover:text-gray-800 text-gray-400' strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>

              
            </div> ) ) 
        }
        <div onClick={handleClick} style={{marginTop:'27px'}}
         className=" hover:bg-white hover:cursor-pointer flex justify-center items-center h-32 w-24 rounded-2xl border-dashed border-white border-2">
            <img src={add} className=' w-16 ml-3' />
        </div>
      </div>
    </div>
  )
}
