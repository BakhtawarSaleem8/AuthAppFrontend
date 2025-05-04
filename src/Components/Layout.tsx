import React , {useEffect, useRef, useState} from 'react';
import { Outlet , Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./layout.css"
import { useUser } from '../Store/AuthUser';

const Layout: React.FC = () => {
  const location = useLocation()
  const navRef = useRef<HTMLElement>()
  console.log(location)
  const {user} = useUser()
  let nav : HTMLElement | null;
  useEffect(() => {
    setTimeout(() => {
      nav = document.getElementById('nav');

    }, 500);

  }, [])
  
  const authUser: undefined | Record<string, string> = (() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : undefined;
  })();

  function handleCheckBoxChange(e:any){
   console.log("func called")
      if (e.target.checked && navRef?.current) {
        console.log("checked")
        navRef.current.style.transform = 'translateX(0%)';
      } else if(navRef?.current){
        navRef.current.style.transform = 'translateX(120%)';
      }
   
  }
  
  const navBar = [
    { title: "Home", url: "/user/home", roles: ["user", "admin"] },
    { title: "My Profile", url: "/user/:id", roles: ["user", "admin"] },
    { title: "Posts", url: "/admin/posts", roles: ["admin"] },
    { title: "Categories", url: "/admin/categories", roles: ["admin"] },
  ];

  const filteredNavBar = navBar.filter((item) =>
    item.roles.includes(Number(authUser?.role) === 1 ? "admin" : "user")
  );
  return (
    <div>
      <header className='flex justify-between items-start'>
        {/* Your NavBar */}
        <div className='flex md:hidden items-center gap-3 font-bold text-lg '><img src='/assets/world.jpg' className='h-8 w-8 object-contain rounded-full'/>TrendSphere</div>
        <label className='hamburger-menu md:hidden flex '>
          <input className='peer' type='checkbox' onChange={(e)=>handleCheckBoxChange(e)} />
        </label>
        <nav ref={navRef} className={` w-[97%] flex flex-col md:flex-row h-screen md:h-full  md:justify-between md:!translate-x-0 translate-x-[1000%] justify-center gap-10 items-center rounded-3xl shadow-sm px-5 py-3 mx-5 my-2 bg-[#266CA9] text-white transition-all ease-in-out duration-1000`}>
          <div className='md:flex hidden items-center gap-3 font-bold text-lg '><img src='/assets/world.jpg' className='h-8 w-8 object-contain rounded-full'/>TrendSphere</div>
          <ul className='flex flex-col md:flex-row justify-center gap-10  md:gap-24  font-bold '>
            {filteredNavBar.map((item , index)=>(<li className={`${ (location.pathname === item.url) ? "text-orange-400 border-b-2 border-orange-400" : "hover:bg-orange-400"} px-2 transition-all ease-in-out duration-500 `}><Link to={item.url}>{item.title}</Link></li>))}
            <li><Link to="/">Settings</Link></li>
          </ul>
        </nav>
      </header>

      <main className='mt-[20px] px-10'>
        {/* Render child routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
