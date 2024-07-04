import { useContext } from 'react'
import login from '../../../../assets/userr.png'
import Font from 'react-font'
import { GlobalStateContext } from '../../GlobalState'

export default function Header() {

const {currentUser} = useContext(GlobalStateContext)


  return (
    <div className=' p-12 grid grid-cols-2 mr-28' >
        <div className='flex justify-center ml-3'>
            <img src={login} style={{borderRadius:"100%",width:'60%',padding:'10px',border:'5px solid white'}} />
        </div>
        <div className=' mt-4'>
            <Font family='Kanit'><h1 className='text-gray-800'>Hi ! I am {currentUser.name} </h1><br /></Font>
            <Font family='Kanit'><h2 className='text-gray-700'>{currentUser.profession}</h2></Font><br /><br />
            <div>
                
                <div className='flex gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                        <path className='text-gray-800' strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p style={{fontWeight:'600'}} className='text-gray-800 font-serif'>{currentUser.email}</p>
                </div>

                <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                    <path className='text-gray-800'  strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <p style={{fontWeight:'600'}} className='text-gray-800 font-serif'>{currentUser.phone}</p>
                </div>

                <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                    <path className='text-gray-800'  strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path className='text-gray-800'  strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p style={{fontWeight:'600'}} className='text-gray-800 font-serif'>{currentUser.address}</p>
                </div>

            </div>
        </div>
      
    </div>
  )
}
