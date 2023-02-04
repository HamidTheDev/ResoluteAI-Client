import React, { useContext } from 'react';
import { Usercontext } from '../components/Authprovider/Authprovider';

const Header = () => {
  const { loader, user, auth } = useContext(Usercontext);
  return (
    <div className="flex items-center justify-between container mx-auto pt-6 pb-20">
      <div>
        <span className="text-[30px] font-extrabold text-[rgba(88,74,74,0.73)]">LOGO</span>
      </div>
      <div className='py-4 rounded-md px-14 shadow'>
        <i class="fa-regular fa-user pr-5 text-xl text-black"></i>
        <span className="text-black">{user?.email}</span>
      </div>
    </div>
  );
};

export default Header;