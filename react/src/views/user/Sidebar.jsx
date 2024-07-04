import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png"
import control from "../../assets/control.png"
import User from "../../assets/User.png"
import Chat from "../../assets/Chat.png"
import { GlobalStateContext } from "./GlobalState";
import axiosClient from "../../axios";


const SidebarNav = () => {

  const { setUserToken} = useContext(GlobalStateContext)

  
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Account",link:`/user`, src: User ,gap: true },
    { title: "Inbox",link:'#', src: Chat, gap: true }, 
  ];
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('TOKEN')
    setUserToken('')
    navigate('/home')
  }

  const handleClick = ()=>{
    axiosClient.post('/create_cv')
    .then(({data})=>{
      navigate(`user/CVmaker/${data.id}`)
    })
  }
  
  return (
    <div className="flex fixed" style={{zIndex:"100"}} >
      <div
        className={` ${
          open ? "w-52 pl-7" : "w-14 pl-10 "
        } bg-gray-800 h-screen   pt-8 relative duration-300`}>

        <img

          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7    ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="gap-x-4 ">
          
          <img

            src={logo}
            className={`cursor-pointer w-32 duration-500 ${!open && "hidden"} 
            ${open && "rotate-[360deg]"}`}
            
          />

        </div>
        <ul className="pt-6" style={{ paddingLeft: open ? "0px" : "0px", marginLeft: open ? "0" : "-35px" }}>
          {Menus.map((Menu, index) => (
            <Link key={index} to={Menu.link} style={{textDecoration:'none'}}>
             <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-600 text-gray-300 text-sm items-start gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src= {Menu.src}  />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}
          <br />

          <Link to='/user/opportunities' style={{textDecoration:'none'}}>
            <li
              className={`flex rounded-md  hover:bg-gray-600 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>

              <span className={`${!open && "hidden"} origin-left duration-200`}>
                opportunities
              </span>
            </li>
          </Link>

            <br />
          <Link to='/user/CVmaker' style={{textDecoration:'none'}}>
            <li onClick={handleClick}
              className={`flex rounded-md  hover:bg-gray-600 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                New resume !
              </span>
            </li>
          </Link>

          
          <li onClick={handleLogout}
            className={`flex mt-64 rounded-md  hover:bg-gray-600 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              logout
            </span>
          </li>
          

        </ul>
      </div>
    </div>
  );
};
export default SidebarNav;