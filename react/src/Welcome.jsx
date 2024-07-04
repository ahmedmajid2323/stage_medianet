import email_verified from './assets/verified.png'
import email_non_verified from './assets/non_verified.png'
import { Link , useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import axiosClient from './axios'

export default function Welcome() {

    const [status , setStatus] = useState() 

    const { token } = useParams(); 
    useEffect(()=>{
        axiosClient.post(`/activation/${token}`)
        .then((response)=>{
            setStatus(response.status)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    return (
        <div style={{ height: "100vh" }}
            className="flex justify-center items-center bg-gray-800">
            <div className="bg-white flex justify-center p-3"
                style={{ height: "50%", width: "40%", borderRadius: " 0% 20% / 10% 40% " }}>

                <div>
                    <h1 className="text-gray-800 font-serif">{ status === 200 ? "email verified" : "email non verified"  } </h1>
                    <img src={ status === 200 ? email_verified : email_non_verified  } className=' w-48 ml-10' />  <br />
                    <Link to={ status === 200 ? "/home" : "/signup"  } style={{ textDecoration: 'none' }}>
                        <div className=' hover:bg-gray-500 flex justify-evenly font-serif rounded-xl p-3 bg-gray-800 text-white'>
                        { status === 200 ? "login to your account" : "sign up again"  }
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                        </div>
                    </Link>
                </div>

            </div>

        </div>

    )
}
